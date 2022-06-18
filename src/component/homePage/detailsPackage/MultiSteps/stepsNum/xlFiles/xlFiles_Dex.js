import React, { useState, useEffect, useRef } from "react"
import { ExcelRenderer } from "react-excel-renderer";
import { useTranslation } from "react-i18next";
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import trash from "../../../../images/Trash.png"
import xlImg from "../../../../images/xlImg.png"
import "../xlFiles/xlFiles.css"
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles"
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Dialog from '@mui/material/Dialog';
import { useMediaQuery } from "react-responsive"
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import like from "../../../../images/like.png"
import ImportXlFiles from "../xlFiles/xl_file_responsive"



export default function XlPopUpDex({ AllDetailsOfPackage, fileObject, setFileObject, selected, setShowInput, showInput }) {




  const cacheLtr = createCache({
    key: "muiltr"
  });
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin]
  });
  const ltrTheme = document.documentElement.dir === "rtl" ? createTheme({ direction: "rtl" }) : createTheme({ direction: "ltr" });




  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })

  const [showInputFiles, setShowInputFiles] = React.useState(true);
  const [isSelectedFile, setIsSelectedFile] = React.useState(false);




  return (
    <div>

      <Dialog hideBackdrop fullWidth={!isMobile && true} sx={{
        overflow: "auto", '& .MuiPaper-root':
          { height: !fileObject ? '720px' : "350px",
          //  color: "",
          //  boxShadow:"none",
          //  color:"white",
           transition:"none",
            maxHeight: "720", maxWidth: "675px", width: "675", overflow: "hidden" },
        '& .MuiDialog-container': { height: !fileObject ? "auto" : "100%" },
      }}

        open={showInput} >


        <CacheProvider value={ltrTheme.direction === "ltr" ? (cacheRtl) : cacheLtr}>

          <CssBaseline />
          <DialogContent sx={{ overflow: "hidden" }}>

            <ImportXlFiles fileObject={fileObject} setFileObject={setFileObject} AllDetailsOfPackage={AllDetailsOfPackage} selected={selected} setShowInput={setShowInput} showInput={showInput} />
          </DialogContent>
        </CacheProvider>
      </Dialog>

    </div>
  );
}



