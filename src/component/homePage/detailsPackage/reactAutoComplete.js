import { TextField, CssBaseline, autocompleteClasses, IconButton, InputAdornment } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState, useRef } from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles"
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useMediaQuery } from 'react-responsive'
import Button from '@mui/material/Button';
import placeholder from "../images/placeholder.png"
import "../detailsPackage/reactAutoComplete.css"
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { useTranslation } from "react-i18next";
import { height } from '@mui/system';

import { useParams } from "react-router-dom";







export default function LocationSearchInput({ exitAddress,
  errorAutoComplet, setErrorAutoComplet,
  setExitaddress, onChange, value,
  setIsClickd, label, selected,
  detailsOfPackage }) {


  const { token } = useParams()
  const ref = useRef()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 650px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
  const [color, setColor] = useState('')

  useEffect(() => {
    if (token) {
      onChange && onChange(`${exitAddress?.streetName ? exitAddress?.streetName : ''} ${exitAddress?.streetNum ? exitAddress?.streetNum : ""} ${exitAddress?.cityName ? exitAddress?.cityName : ""}`)

    }

  }, [])


  const { t, i18n } = useTranslation();


  const cacheLtr = createCache({
    key: "muiltr"
  });
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin]
  });

  const handleChange = (address) => {

    onChange && onChange(address);

  };

  const handleSelect = async address => {


    try {
      const results = await geocodeByAddress(address);
      // console.log(results[0]);


      const addressComponents = results[0].address_components;

      if (addressComponents) {
        onChange && onChange(address);
        setColor('success')
      }
      const filterCity = addressComponents.filter(
        address_component => address_component.types.includes("locality")
      );

      const filterStreet = addressComponents.filter(
        address_component => address_component.types.includes("route")
      );
      const filterStreetNum = addressComponents.filter(
        address_component => address_component.types.includes("street_number")
      );

      const latLng = await getLatLng(results[0])


      setIsClickd && setIsClickd(true)
      if (setExitaddress) {
        exitAddress.cityName = filterCity[0]?.long_name
        exitAddress.streetName = filterStreet[0]?.long_name
        exitAddress.streetNum = filterStreetNum[0]?.long_name
        setExitaddress({ ...exitAddress })
      }


      selected && selected([
        ...detailsOfPackage,
        {

          id_package: detailsOfPackage.length + 1,
          lat: latLng.lat,
          lng: latLng.lng,
          destination: address,
          cityName: filterCity[0]?.long_name,
          streetName: filterStreet[0]?.long_name,
          streetNum: filterStreetNum[0]?.long_name,
          contactName: "",
          contactPhone: "",
          payForStation: "",
          comment: "",
          currency_symbol_payForStation: "₪"
        }
      ])
      selected && onChange("")



      // console.log(detailsOfPackage);

    }
    catch (error) {
      console.error('Error', error)

      return setErrorAutoComplet(t("ERROR_MESSAGE_AUTOCOMPLET"))
    }

  };

  const handleCloseClick = (event) => {
    event.preventDefault()
    onChange("")
  };

  const InputLabelProps = {
    fontFamily: 'Heebo',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '15px',
    lineHeight: '22px',
    textAlign: 'right',
    color: '#4F5976',

  }

  const isRTL = (s) => {
    if (s !== '') {
      var ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' + '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
        rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
        rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');

      return rtlDirCheck.test(s);
    }
    return true
  };

  const hightResponsiveAutoComplet = () => {
    if (isMobile && !selected) {
      return "40px"
    }
    if (isMobile && selected) {
      return "25px"
    }

    if (isTabletOrMobile && !selected) {
      return "40px"
    }
    if (isTabletOrMobile && selected) {
      return "30px"
    }
  }


  const marginTopAutoComplet = () => {
    if (!selected && isMobile) {
      return "35px"
    }
    if (!selected && !isTabletOrMobile) {
      return "25px"
    }
    if (!selected && isTabletOrMobile) {
      return "25px"
    }
    if (selected && isTabletOrMobile) {
      return "35px"
    }
    if (selected && !isTabletOrMobile) {
      return "30px"
    }
    
  }

  const clearAddress = () => {
    if (onChange && !selected) {
      onChange("")
      setExitaddress({ cityName: "", streetName: "", streetNum: "" })
    }
    if (onChange && selected) {
      onChange("")
    }


  }


  const ltrTheme = document.documentElement.dir === "rtl" ? createTheme({ direction: "rtl" }) : createTheme({ direction: "ltr" });

  return (

    <PlacesAutocomplete
      value={value}
      onChange={handleChange}
      onSelect={handleSelect}


    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div style={{ position: "relative" }}>
          <CacheProvider value={ltrTheme.direction === "ltr" && isRTL(value) ? (cacheRtl) : cacheLtr}>

            <CssBaseline />
            <TextField

              type='text'
              error={!!errorAutoComplet}
              helperText={errorAutoComplet ? errorAutoComplet : ""}
              onFocus={() => setErrorAutoComplet(false)}
              color={color}
              autoFocus
              sx={{ '& .MuiFormHelperText-root': { fontFamily: "heebo" }, '& .MuiOutlinedInput-root': { direction: ltrTheme.direction === "ltr" && isRTL(value) ? "rtl" : "rtl" } }}
              style={{ width: '100%', maxWidth: isTabletOrMobile ? "516px" : "545px", }}
              label={label}
              id="outlined-size-small"
              //  inputProps={{direction: "rtl"}}
              inputProps={{

                style: { direction: ltrTheme.direction === "ltr" && isRTL(value) ? "rtl" : "ltr", height: hightResponsiveAutoComplet() }
              }}
              InputProps={

                {



                  startAdornment: value ? (
                    <InputAdornment position='start'>
                      <IconButton size="small" onClick={clearAddress}>
                        <ClearIcon style={{ color: "#583DFF" }} />
                      </IconButton>
                    </InputAdornment>) : undefined

                }}





              InputLabelProps={{
                style: InputLabelProps,
                shrink: true,

              }}

              {...getInputProps({
                placeholder: label,
                className: 'location-search-input',

              })}
            />
          </CacheProvider>
          <div style={{
            marginTop: marginTopAutoComplet(),
            border: suggestions.length ? "1px solid black" : "",
            borderTop: suggestions.length ? "0px" : "",
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            borderRadius: '0 0 2px 2px', zIndex: "1000",
            maxWidth: isTabletOrMobile ? "516px" : "545px",
            direction: !isRTL(value) ? "ltr" : "rtl", position: "absolute", width: '100%',
          }}
            className="autocomplete-dropdown-container"
          >

            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, i) => {

              // const className = suggestion.active
              //   ? 'suggestion-item--active'
              //   : 'suggestion-item';

              const style = suggestion.active
                ? {
                  backgroundColor: '#F1F1F6', cursor: 'pointer', color: "#583DFF"
                }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div key={i}
                  className="input-suggestion"
                  {...getSuggestionItemProps(suggestion, {
                    // className,
                    style,

                  })}
                // onClick={handleClick}

                >


                  <img style={{ margin: "8px" }} height={20} width={20} src={placeholder} /> <span className='dirInput'>{suggestion.description} </span>

                </div>
              );
            })}

          </div>

        </div>
      )}
    </PlacesAutocomplete>

  );

}