// Dictionaries that the solver will use and Dictionary tab will interact with.
const wordleDefaultSolutions = {
    dictStr: 'TESTA\nTESTB\nTESTC\nTESTD',
    dictArr: ['TESTA', 'TESTB', 'TESTC', 'TESTD']
    // dictStr: "ABACK\nABASE\nABATE\nABBEY\nABBOT\nABHOR\nABIDE\nABLED\nABODE\nABORT\nABOUT\nABOVE\nABUSE\nABYSS\nACORN\nACRID\nACTOR\nACUTE\nADAGE\nADAPT\nADEPT\nADMIN\nADMIT\nADOBE\nADOPT\nADORE\nADORN\nADULT\nAFFIX\nAFIRE\nAFOOT\nAFOUL\nAFTER\nAGAIN\nAGAPE\nAGATE\nAGENT\nAGILE\nAGING\nAGLOW\nAGONY\nAGREE\nAHEAD\nAIDER\nAISLE\nALARM\nALBUM\nALERT\nALGAE\nALIBI\nALIEN\nALIGN\nALIKE\nALIVE\nALLAY\nALLEY\nALLOT\nALLOW\nALLOY\nALOFT\nALONE\nALONG\nALOOF\nALOUD\nALPHA\nALTAR\nALTER\nAMASS\nAMAZE\nAMBER\nAMBLE\nAMEND\nAMISS\nAMITY\nAMONG\nAMPLE\nAMPLY\nAMUSE\nANGEL\nANGER\nANGLE\nANGRY\nANGST\nANIME\nANKLE\nANNEX\nANNOY\nANNUL\nANODE\nANTIC\nANVIL\nAORTA\nAPART\nAPHID\nAPING\nAPNEA\nAPPLE\nAPPLY\nAPRON\nAPTLY\nARBOR\nARDOR\nARENA\nARGUE\nARISE\nARMOR\nAROMA\nAROSE\nARRAY\nARROW\nARSON\nARTSY\nASCOT\nASHEN\nASIDE\nASKEW\nASSAY\nASSET\nATOLL\nATONE\nATTIC\nAUDIO\nAUDIT\nAUGUR\nAUNTY\nAVAIL\nAVERT\nAVIAN\nAVOID\nAWAIT\nAWAKE\nAWARD\nAWARE\nAWASH\nAWFUL\nAWOKE\nAXIAL\nAXIOM\nAXION\nAZURE\nBACON\nBADGE\nBADLY\nBAGEL\nBAGGY\nBAKER\nBALER\nBALMY\nBANAL\nBANJO\nBARGE\nBARON\nBASAL\nBASIC\nBASIL\nBASIN\nBASIS\nBASTE\nBATCH\nBATHE\nBATON\nBATTY\nBAWDY\nBAYOU\nBEACH\nBEADY\nBEARD\nBEAST\nBEECH\nBEEFY\nBEFIT\nBEGAN\nBEGAT\nBEGET\nBEGIN\nBEGUN\nBEING\nBELCH\nBELIE\nBELLE\nBELLY\nBELOW\nBENCH\nBERET\nBERRY\nBERTH\nBESET\nBETEL\nBEVEL\nBEZEL\nBIBLE\nBICEP\nBIDDY\nBIGOT\nBILGE\nBILLY\nBINGE\nBINGO\nBIOME\nBIRCH\nBIRTH\nBISON\nBITTY\nBLACK\nBLADE\nBLAME\nBLAND\nBLANK\nBLARE\nBLAST\nBLAZE\nBLEAK\nBLEAT\nBLEED\nBLEEP\nBLEND\nBLESS\nBLIMP\nBLIND\nBLINK\nBLISS\nBLITZ\nBLOAT\nBLOCK\nBLOKE\nBLOND\nBLOOD\nBLOOM\nBLOWN\nBLUER\nBLUFF\nBLUNT\nBLURB\nBLURT\nBLUSH\nBOARD\nBOAST\nBOBBY\nBONEY\nBONGO\nBONUS\nBOOBY\nBOOST\nBOOTH\nBOOTY\nBOOZE\nBOOZY\nBORAX\nBORNE\nBOSOM\nBOSSY\nBOTCH\nBOUGH\nBOULE\nBOUND\nBOWEL\nBOXER\nBRACE\nBRAID\nBRAIN\nBRAKE\nBRAND\nBRASH\nBRASS\nBRAVE\nBRAVO\nBRAWL\nBRAWN\nBREAD\nBREAK\nBREED\nBRIAR\nBRIBE\nBRICK\nBRIDE\nBRIEF\nBRINE\nBRING\nBRINK\nBRINY\nBRISK\nBROAD\nBROIL\nBROKE\nBROOD\nBROOK\nBROOM\nBROTH\nBROWN\nBRUNT\nBRUSH\nBRUTE\nBUDDY\nBUDGE\nBUGGY\nBUGLE\nBUILD\nBUILT\nBULGE\nBULKY\nBULLY\nBUNCH\nBUNNY\nBURLY\nBURNT\nBURST\nBUSED\nBUSHY\nBUTCH\nBUTTE\nBUXOM\nBUYER\nBYLAW\nCABAL\nCABBY\nCABIN\nCABLE\nCACAO\nCACHE\nCACTI\nCADDY\nCADET\nCAGEY\nCAIRN\nCAMEL\nCAMEO\nCANAL\nCANDY\nCANNY\nCANOE\nCANON\nCAPER\nCAPUT\nCARAT\nCARGO\nCAROL\nCARRY\nCARVE\nCASTE\nCATCH\nCATER\nCATTY\nCAULK\nCAUSE\nCAVIL\nCEASE\nCEDAR\nCELLO\nCHAFE\nCHAFF\nCHAIN\nCHAIR\nCHALK\nCHAMP\nCHANT\nCHAOS\nCHARD\nCHARM\nCHART\nCHASE\nCHASM\nCHEAP\nCHEAT\nCHECK\nCHEEK\nCHEER\nCHESS\nCHEST\nCHICK\nCHIDE\nCHIEF\nCHILD\nCHILI\nCHILL\nCHIME\nCHINA\nCHIRP\nCHOCK\nCHOIR\nCHOKE\nCHORD\nCHORE\nCHOSE\nCHUCK\nCHUMP\nCHUNK\nCHURN\nCHUTE\nCIDER\nCIGAR\nCINCH\nCIRCA\nCIVIC\nCIVIL\nCLACK\nCLAIM\nCLAMP\nCLANG\nCLANK\nCLASH\nCLASP\nCLASS\nCLEAN\nCLEAR\nCLEAT\nCLEFT\nCLERK\nCLICK\nCLIFF\nCLIMB\nCLING\nCLINK\nCLOAK\nCLOCK\nCLONE\nCLOSE\nCLOTH\nCLOUD\nCLOUT\nCLOVE\nCLOWN\nCLUCK\nCLUED\nCLUMP\nCLUNG\nCOACH\nCOAST\nCOBRA\nCOCOA\nCOLON\nCOLOR\nCOMET\nCOMFY\nCOMIC\nCOMMA\nCONCH\nCONDO\nCONIC\nCOPSE\nCORAL\nCORER\nCORNY\nCOUCH\nCOUGH\nCOULD\nCOUNT\nCOUPE\nCOURT\nCOVEN\nCOVER\nCOVET\nCOVEY\nCOWER\nCOYLY\nCRACK\nCRAFT\nCRAMP\nCRANE\nCRANK\nCRASH\nCRASS\nCRATE\nCRAVE\nCRAWL\nCRAZE\nCRAZY\nCREAK\nCREAM\nCREDO\nCREED\nCREEK\nCREEP\nCREME\nCREPE\nCREPT\nCRESS\nCREST\nCRICK\nCRIED\nCRIER\nCRIME\nCRIMP\nCRISP\nCROAK\nCROCK\nCRONE\nCRONY\nCROOK\nCROSS\nCROUP\nCROWD\nCROWN\nCRUDE\nCRUEL\nCRUMB\nCRUMP\nCRUSH\nCRUST\nCRYPT\nCUBIC\nCUMIN\nCURIO\nCURLY\nCURRY\nCURSE\nCURVE\nCURVY\nCUTIE\nCYBER\nCYCLE\nCYNIC\nDADDY\nDAILY\nDAIRY\nDAISY\nDALLY\nDANCE\nDANDY\nDATUM\nDAUNT\nDEALT\nDEATH\nDEBAR\nDEBIT\nDEBUG\nDEBUT\nDECAL\nDECAY\nDECOR\nDECOY\nDECRY\nDEFER\nDEIGN\nDEITY\nDELAY\nDELTA\nDELVE\nDEMON\nDEMUR\nDENIM\nDENSE\nDEPOT\nDEPTH\nDERBY\nDETER\nDETOX\nDEUCE\nDEVIL\nDIARY\nDICEY\nDIGIT\nDILLY\nDIMLY\nDINER\nDINGO\nDINGY\nDIODE\nDIRGE\nDIRTY\nDISCO\nDITCH\nDITTO\nDITTY\nDIVER\nDIZZY\nDODGE\nDODGY\nDOGMA\nDOING\nDOLLY\nDONOR\nDONUT\nDOPEY\nDOUBT\nDOUGH\nDOWDY\nDOWEL\nDOWNY\nDOWRY\nDOZEN\nDRAFT\nDRAIN\nDRAKE\nDRAMA\nDRANK\nDRAPE\nDRAWL\nDRAWN\nDREAD\nDREAM\nDRESS\nDRIED\nDRIER\nDRIFT\nDRILL\nDRINK\nDRIVE\nDROIT\nDROLL\nDRONE\nDROOL\nDROOP\nDROSS\nDROVE\nDROWN\nDRUID\nDRUNK\nDRYER\nDRYLY\nDUCHY\nDULLY\nDUMMY\nDUMPY\nDUNCE\nDUSKY\nDUSTY\nDUTCH\nDUVET\nDWARF\nDWELL\nDWELT\nDYING\nEAGER\nEAGLE\nEARLY\nEARTH\nEASEL\nEATEN\nEATER\nEBONY\nECLAT\nEDICT\nEDIFY\nEERIE\nEGRET\nEIGHT\nEJECT\nEKING\nELATE\nELBOW\nELDER\nELECT\nELEGY\nELFIN\nELIDE\nELITE\nELOPE\nELUDE\nEMAIL\nEMBED\nEMBER\nEMCEE\nEMPTY\nENACT\nENDOW\nENEMA\nENEMY\nENJOY\nENNUI\nENSUE\nENTER\nENTRY\nENVOY\nEPOCH\nEPOXY\nEQUAL\nEQUIP\nERASE\nERECT\nERODE\nERROR\nERUPT\nESSAY\nESTER\nETHER\nETHIC\nETHOS\nETUDE\nEVADE\nEVENT\nEVERY\nEVICT\nEVOKE\nEXACT\nEXALT\nEXCEL\nEXERT\nEXILE\nEXIST\nEXPEL\nEXTOL\nEXTRA\nEXULT\nEYING\nFABLE\nFACET\nFAINT\nFAIRY\nFAITH\nFALSE\nFANCY\nFANNY\nFARCE\nFATAL\nFATTY\nFAULT\nFAUNA\nFAVOR\nFEAST\nFECAL\nFEIGN\nFELLA\nFELON\nFEMME\nFEMUR\nFENCE\nFERAL\nFERRY\nFETAL\nFETCH\nFETID\nFETUS\nFEVER\nFEWER\nFIBER\nFICUS\nFIELD\nFIEND\nFIERY\nFIFTH\nFIFTY\nFIGHT\nFILER\nFILET\nFILLY\nFILMY\nFILTH\nFINAL\nFINCH\nFINER\nFIRST\nFISHY\nFIXER\nFIZZY\nFJORD\nFLACK\nFLAIL\nFLAIR\nFLAKE\nFLAKY\nFLAME\nFLANK\nFLARE\nFLASH\nFLASK\nFLECK\nFLEET\nFLESH\nFLICK\nFLIER\nFLING\nFLINT\nFLIRT\nFLOAT\nFLOCK\nFLOOD\nFLOOR\nFLORA\nFLOSS\nFLOUR\nFLOUT\nFLOWN\nFLUFF\nFLUID\nFLUKE\nFLUME\nFLUNG\nFLUNK\nFLUSH\nFLUTE\nFLYER\nFOAMY\nFOCAL\nFOCUS\nFOGGY\nFOIST\nFOLIO\nFOLLY\nFORAY\nFORCE\nFORGE\nFORGO\nFORTE\nFORTH\nFORTY\nFORUM\nFOUND\nFOYER\nFRAIL\nFRAME\nFRANK\nFRAUD\nFREAK\nFREED\nFREER\nFRESH\nFRIAR\nFRIED\nFRILL\nFRISK\nFRITZ\nFROCK\nFROND\nFRONT\nFROST\nFROTH\nFROWN\nFROZE\nFRUIT\nFUDGE\nFUGUE\nFULLY\nFUNGI\nFUNKY\nFUNNY\nFUROR\nFURRY\nFUSSY\nFUZZY\nGAFFE\nGAILY\nGAMER\nGAMMA\nGAMUT\nGASSY\nGAUDY\nGAUGE\nGAUNT\nGAUZE\nGAVEL\nGAWKY\nGAYER\nGAYLY\nGAZER\nGECKO\nGEEKY\nGEESE\nGENIE\nGENRE\nGHOST\nGHOUL\nGIANT\nGIDDY\nGIPSY\nGIRLY\nGIRTH\nGIVEN\nGIVER\nGLADE\nGLAND\nGLARE\nGLASS\nGLAZE\nGLEAM\nGLEAN\nGLIDE\nGLINT\nGLOAT\nGLOBE\nGLOOM\nGLORY\nGLOSS\nGLOVE\nGLYPH\nGNASH\nGNOME\nGODLY\nGOING\nGOLEM\nGOLLY\nGONAD\nGONER\nGOODY\nGOOEY\nGOOFY\nGOOSE\nGORGE\nGOUGE\nGOURD\nGRACE\nGRADE\nGRAFT\nGRAIL\nGRAIN\nGRAND\nGRANT\nGRAPE\nGRAPH\nGRASP\nGRASS\nGRATE\nGRAVE\nGRAVY\nGRAZE\nGREAT\nGREED\nGREEN\nGREET\nGRIEF\nGRILL\nGRIME\nGRIMY\nGRIND\nGRIPE\nGROAN\nGROIN\nGROOM\nGROPE\nGROSS\nGROUP\nGROUT\nGROVE\nGROWL\nGROWN\nGRUEL\nGRUFF\nGRUNT\nGUARD\nGUAVA\nGUESS\nGUEST\nGUIDE\nGUILD\nGUILE\nGUILT\nGUISE\nGULCH\nGULLY\nGUMBO\nGUMMY\nGUPPY\nGUSTO\nGUSTY\nGYPSY\nHABIT\nHAIRY\nHALVE\nHANDY\nHAPPY\nHARDY\nHAREM\nHARPY\nHARRY\nHARSH\nHASTE\nHASTY\nHATCH\nHATER\nHAUNT\nHAUTE\nHAVEN\nHAVOC\nHAZEL\nHEADY\nHEARD\nHEART\nHEATH\nHEAVE\nHEAVY\nHEDGE\nHEFTY\nHEIST\nHELIX\nHELLO\nHENCE\nHERON\nHILLY\nHINGE\nHIPPO\nHIPPY\nHITCH\nHOARD\nHOBBY\nHOIST\nHOLLY\nHOMER\nHONEY\nHONOR\nHORDE\nHORNY\nHORSE\nHOTEL\nHOTLY\nHOUND\nHOUSE\nHOVEL\nHOVER\nHOWDY\nHUMAN\nHUMID\nHUMOR\nHUMPH\nHUMUS\nHUNCH\nHUNKY\nHURRY\nHUSKY\nHUSSY\nHUTCH\nHYDRO\nHYENA\nHYMEN\nHYPER\nICILY\nICING\nIDEAL\nIDIOM\nIDIOT\nIDLER\nIDYLL\nIGLOO\nILIAC\nIMAGE\nIMBUE\nIMPEL\nIMPLY\nINANE\nINBOX\nINCUR\nINDEX\nINEPT\nINERT\nINFER\nINGOT\nINLAY\nINLET\nINNER\nINPUT\nINTER\nINTRO\nIONIC\nIRATE\nIRONY\nISLET\nISSUE\nITCHY\nIVORY\nJAUNT\nJAZZY\nJELLY\nJERKY\nJETTY\nJEWEL\nJIFFY\nJOINT\nJOIST\nJOKER\nJOLLY\nJOUST\nJUDGE\nJUICE\nJUICY\nJUMBO\nJUMPY\nJUNTA\nJUNTO\nJUROR\nKAPPA\nKARMA\nKAYAK\nKEBAB\nKHAKI\nKINKY\nKIOSK\nKITTY\nKNACK\nKNAVE\nKNEAD\nKNEED\nKNEEL\nKNELT\nKNIFE\nKNOCK\nKNOLL\nKNOWN\nKOALA\nKRILL\nLABEL\nLABOR\nLADEN\nLADLE\nLAGER\nLANCE\nLANKY\nLAPEL\nLAPSE\nLARGE\nLARVA\nLASSO\nLATCH\nLATER\nLATHE\nLATTE\nLAUGH\nLAYER\nLEACH\nLEAFY\nLEAKY\nLEANT\nLEAPT\nLEARN\nLEASE\nLEASH\nLEAST\nLEAVE\nLEDGE\nLEECH\nLEERY\nLEFTY\nLEGAL\nLEGGY\nLEMON\nLEMUR\nLEPER\nLEVEL\nLEVER\nLIBEL\nLIEGE\nLIGHT\nLIKEN\nLILAC\nLIMBO\nLIMIT\nLINEN\nLINER\nLINGO\nLIPID\nLITHE\nLIVER\nLIVID\nLLAMA\nLOAMY\nLOATH\nLOBBY\nLOCAL\nLOCUS\nLODGE\nLOFTY\nLOGIC\nLOGIN\nLOOPY\nLOOSE\nLORRY\nLOSER\nLOUSE\nLOUSY\nLOVER\nLOWER\nLOWLY\nLOYAL\nLUCID\nLUCKY\nLUMEN\nLUMPY\nLUNAR\nLUNCH\nLUNGE\nLUPUS\nLURCH\nLURID\nLUSTY\nLYING\nLYMPH\nLYRIC\nMACAW\nMACHO\nMACRO\nMADAM\nMADLY\nMAFIA\nMAGIC\nMAGMA\nMAIZE\nMAJOR\nMAKER\nMAMBO\nMAMMA\nMAMMY\nMANGA\nMANGE\nMANGO\nMANGY\nMANIA\nMANIC\nMANLY\nMANOR\nMAPLE\nMARCH\nMARRY\nMARSH\nMASON\nMASSE\nMATCH\nMATEY\nMAUVE\nMAXIM\nMAYBE\nMAYOR\nMEALY\nMEANT\nMEATY\nMECCA\nMEDAL\nMEDIA\nMEDIC\nMELEE\nMELON\nMERCY\nMERGE\nMERIT\nMERRY\nMETAL\nMETER\nMETRO\nMICRO\nMIDGE\nMIDST\nMIGHT\nMILKY\nMIMIC\nMINCE\nMINER\nMINIM\nMINOR\nMINTY\nMINUS\nMIRTH\nMISER\nMISSY\nMOCHA\nMODAL\nMODEL\nMODEM\nMOGUL\nMOIST\nMOLAR\nMOLDY\nMONEY\nMONTH\nMOODY\nMOOSE\nMORAL\nMORON\nMORPH\nMOSSY\nMOTEL\nMOTIF\nMOTOR\nMOTTO\nMOULT\nMOUND\nMOUNT\nMOURN\nMOUSE\nMOUTH\nMOVER\nMOVIE\nMOWER\nMUCKY\nMUCUS\nMUDDY\nMULCH\nMUMMY\nMUNCH\nMURAL\nMURKY\nMUSHY\nMUSIC\nMUSKY\nMUSTY\nMYRRH\nNADIR\nNAIVE\nNANNY\nNASAL\nNASTY\nNATAL\nNAVAL\nNAVEL\nNEEDY\nNEIGH\nNERDY\nNERVE\nNEVER\nNEWER\nNEWLY\nNICER\nNICHE\nNIECE\nNIGHT\nNINJA\nNINNY\nNINTH\nNOBLE\nNOBLY\nNOISE\nNOISY\nNOMAD\nNOOSE\nNORTH\nNOSEY\nNOTCH\nNOVEL\nNUDGE\nNURSE\nNUTTY\nNYLON\nNYMPH\nOAKEN\nOBESE\nOCCUR\nOCEAN\nOCTAL\nOCTET\nODDER\nODDLY\nOFFAL\nOFFER\nOFTEN\nOLDEN\nOLDER\nOLIVE\nOMBRE\nOMEGA\nONION\nONSET\nOPERA\nOPINE\nOPIUM\nOPTIC\nORBIT\nORDER\nORGAN\nOTHER\nOTTER\nOUGHT\nOUNCE\nOUTDO\nOUTER\nOUTGO\nOVARY\nOVATE\nOVERT\nOVINE\nOVOID\nOWING\nOWNER\nOXIDE\nOZONE\nPADDY\nPAGAN\nPAINT\nPALER\nPALSY\nPANEL\nPANIC\nPANSY\nPAPAL\nPAPER\nPARER\nPARKA\nPARRY\nPARSE\nPARTY\nPASTA\nPASTE\nPASTY\nPATCH\nPATIO\nPATSY\nPATTY\nPAUSE\nPAYEE\nPAYER\nPEACE\nPEACH\nPEARL\nPECAN\nPEDAL\nPENAL\nPENCE\nPENNE\nPENNY\nPERCH\nPERIL\nPERKY\nPESKY\nPESTO\nPETAL\nPETTY\nPHASE\nPHONE\nPHONY\nPHOTO\nPIANO\nPICKY\nPIECE\nPIETY\nPIGGY\nPILOT\nPINCH\nPINEY\nPINKY\nPINTO\nPIPER\nPIQUE\nPITCH\nPITHY\nPIVOT\nPIXEL\nPIXIE\nPIZZA\nPLACE\nPLAID\nPLAIN\nPLAIT\nPLANE\nPLANK\nPLANT\nPLATE\nPLAZA\nPLEAD\nPLEAT\nPLIED\nPLIER\nPLUCK\nPLUMB\nPLUME\nPLUMP\nPLUNK\nPLUSH\nPOESY\nPOINT\nPOISE\nPOKER\nPOLAR\nPOLKA\nPOLYP\nPOOCH\nPOPPY\nPORCH\nPOSER\nPOSIT\nPOSSE\nPOUCH\nPOUND\nPOUTY\nPOWER\nPRANK\nPRAWN\nPREEN\nPRESS\nPRICE\nPRICK\nPRIDE\nPRIED\nPRIME\nPRIMO\nPRINT\nPRIOR\nPRISM\nPRIVY\nPRIZE\nPROBE\nPRONE\nPRONG\nPROOF\nPROSE\nPROUD\nPROVE\nPROWL\nPROXY\nPRUDE\nPRUNE\nPSALM\nPUBIC\nPUDGY\nPUFFY\nPULPY\nPULSE\nPUNCH\nPUPIL\nPUPPY\nPUREE\nPURER\nPURGE\nPURSE\nPUSHY\nPUTTY\nPYGMY\nQUACK\nQUAIL\nQUAKE\nQUALM\nQUARK\nQUART\nQUASH\nQUASI\nQUEEN\nQUEER\nQUELL\nQUERY\nQUEST\nQUEUE\nQUICK\nQUIET\nQUILL\nQUILT\nQUIRK\nQUITE\nQUOTA\nQUOTE\nQUOTH\nRABBI\nRABID\nRACER\nRADAR\nRADII\nRADIO\nRAINY\nRAISE\nRAJAH\nRALLY\nRALPH\nRAMEN\nRANCH\nRANDY\nRANGE\nRAPID\nRARER\nRASPY\nRATIO\nRATTY\nRAVEN\nRAYON\nRAZOR\nREACH\nREACT\nREADY\nREALM\nREARM\nREBAR\nREBEL\nREBUS\nREBUT\nRECAP\nRECUR\nRECUT\nREEDY\nREFER\nREFIT\nREGAL\nREHAB\nREIGN\nRELAX\nRELAY\nRELIC\nREMIT\nRENAL\nRENEW\nREPAY\nREPEL\nREPLY\nRERUN\nRESET\nRESIN\nRETCH\nRETRO\nRETRY\nREUSE\nREVEL\nREVUE\nRHINO\nRHYME\nRIDER\nRIDGE\nRIFLE\nRIGHT\nRIGID\nRIGOR\nRINSE\nRIPEN\nRIPER\nRISEN\nRISER\nRISKY\nRIVAL\nRIVER\nRIVET\nROACH\nROAST\nROBIN\nROBOT\nROCKY\nRODEO\nROGER\nROGUE\nROOMY\nROOST\nROTOR\nROUGE\nROUGH\nROUND\nROUSE\nROUTE\nROVER\nROWDY\nROWER\nROYAL\nRUDDY\nRUDER\nRUGBY\nRULER\nRUMBA\nRUMOR\nRUPEE\nRURAL\nRUSTY\nSADLY\nSAFER\nSAINT\nSALAD\nSALLY\nSALON\nSALSA\nSALTY\nSALVE\nSALVO\nSANDY\nSANER\nSAPPY\nSASSY\nSATIN\nSATYR\nSAUCE\nSAUCY\nSAUNA\nSAUTE\nSAVOR\nSAVOY\nSAVVY\nSCALD\nSCALE\nSCALP\nSCALY\nSCAMP\nSCANT\nSCARE\nSCARF\nSCARY\nSCENE\nSCENT\nSCION\nSCOFF\nSCOLD\nSCONE\nSCOOP\nSCOPE\nSCORE\nSCORN\nSCOUR\nSCOUT\nSCOWL\nSCRAM\nSCRAP\nSCREE\nSCREW\nSCRUB\nSCRUM\nSCUBA\nSEDAN\nSEEDY\nSEGUE\nSEIZE\nSEMEN\nSENSE\nSEPIA\nSERIF\nSERUM\nSERVE\nSETUP\nSEVEN\nSEVER\nSEWER\nSHACK\nSHADE\nSHADY\nSHAFT\nSHAKE\nSHAKY\nSHALE\nSHALL\nSHALT\nSHAME\nSHANK\nSHAPE\nSHARD\nSHARE\nSHARK\nSHARP\nSHAVE\nSHAWL\nSHEAR\nSHEEN\nSHEEP\nSHEER\nSHEET\nSHEIK\nSHELF\nSHELL\nSHIED\nSHIFT\nSHINE\nSHINY\nSHIRE\nSHIRK\nSHIRT\nSHOAL\nSHOCK\nSHONE\nSHOOK\nSHOOT\nSHORE\nSHORN\nSHORT\nSHOUT\nSHOVE\nSHOWN\nSHOWY\nSHREW\nSHRUB\nSHRUG\nSHUCK\nSHUNT\nSHUSH\nSHYLY\nSIEGE\nSIEVE\nSIGHT\nSIGMA\nSILKY\nSILLY\nSINCE\nSINEW\nSINGE\nSIREN\nSISSY\nSIXTH\nSIXTY\nSKATE\nSKIER\nSKIFF\nSKILL\nSKIMP\nSKIRT\nSKULK\nSKULL\nSKUNK\nSLACK\nSLAIN\nSLANG\nSLANT\nSLASH\nSLATE\nSLEEK\nSLEEP\nSLEET\nSLEPT\nSLICE\nSLICK\nSLIDE\nSLIME\nSLIMY\nSLING\nSLINK\nSLOOP\nSLOPE\nSLOSH\nSLOTH\nSLUMP\nSLUNG\nSLUNK\nSLURP\nSLUSH\nSLYLY\nSMACK\nSMALL\nSMART\nSMASH\nSMEAR\nSMELL\nSMELT\nSMILE\nSMIRK\nSMITE\nSMITH\nSMOCK\nSMOKE\nSMOKY\nSMOTE\nSNACK\nSNAIL\nSNAKE\nSNAKY\nSNARE\nSNARL\nSNEAK\nSNEER\nSNIDE\nSNIFF\nSNIPE\nSNOOP\nSNORE\nSNORT\nSNOUT\nSNOWY\nSNUCK\nSNUFF\nSOAPY\nSOBER\nSOGGY\nSOLAR\nSOLID\nSOLVE\nSONAR\nSONIC\nSOOTH\nSOOTY\nSORRY\nSOUND\nSOUTH\nSOWER\nSPACE\nSPADE\nSPANK\nSPARE\nSPARK\nSPASM\nSPAWN\nSPEAK\nSPEAR\nSPECK\nSPEED\nSPELL\nSPELT\nSPEND\nSPENT\nSPERM\nSPICE\nSPICY\nSPIED\nSPIEL\nSPIKE\nSPIKY\nSPILL\nSPILT\nSPINE\nSPINY\nSPIRE\nSPITE\nSPLAT\nSPLIT\nSPOIL\nSPOKE\nSPOOF\nSPOOK\nSPOOL\nSPOON\nSPORE\nSPORT\nSPOUT\nSPRAY\nSPREE\nSPRIG\nSPUNK\nSPURN\nSPURT\nSQUAD\nSQUAT\nSQUIB\nSTACK\nSTAFF\nSTAGE\nSTAID\nSTAIN\nSTAIR\nSTAKE\nSTALE\nSTALK\nSTALL\nSTAMP\nSTAND\nSTANK\nSTARE\nSTARK\nSTART\nSTASH\nSTATE\nSTAVE\nSTEAD\nSTEAK\nSTEAL\nSTEAM\nSTEED\nSTEEL\nSTEEP\nSTEER\nSTEIN\nSTERN\nSTICK\nSTIFF\nSTILL\nSTILT\nSTING\nSTINK\nSTINT\nSTOCK\nSTOIC\nSTOKE\nSTOLE\nSTOMP\nSTONE\nSTONY\nSTOOD\nSTOOL\nSTOOP\nSTORE\nSTORK\nSTORM\nSTORY\nSTOUT\nSTOVE\nSTRAP\nSTRAW\nSTRAY\nSTRIP\nSTRUT\nSTUCK\nSTUDY\nSTUFF\nSTUMP\nSTUNG\nSTUNK\nSTUNT\nSTYLE\nSUAVE\nSUGAR\nSUING\nSUITE\nSULKY\nSULLY\nSUMAC\nSUNNY\nSUPER\nSURER\nSURGE\nSURLY\nSUSHI\nSWAMI\nSWAMP\nSWARM\nSWASH\nSWATH\nSWEAR\nSWEAT\nSWEEP\nSWEET\nSWELL\nSWEPT\nSWIFT\nSWILL\nSWINE\nSWING\nSWIRL\nSWISH\nSWOON\nSWOOP\nSWORD\nSWORE\nSWORN\nSWUNG\nSYNOD\nSYRUP\nTABBY\nTABLE\nTABOO\nTACIT\nTACKY\nTAFFY\nTAINT\nTAKEN\nTAKER\nTALLY\nTALON\nTAMER\nTANGO\nTANGY\nTAPER\nTAPIR\nTARDY\nTAROT\nTASTE\nTASTY\nTATTY\nTAUNT\nTAWNY\nTEACH\nTEARY\nTEASE\nTEDDY\nTEETH\nTEMPO\nTENET\nTENOR\nTENSE\nTENTH\nTEPEE\nTEPID\nTERRA\nTERSE\nTESTY\nTHANK\nTHEFT\nTHEIR\nTHEME\nTHERE\nTHESE\nTHETA\nTHICK\nTHIEF\nTHIGH\nTHING\nTHINK\nTHIRD\nTHONG\nTHORN\nTHOSE\nTHREE\nTHREW\nTHROB\nTHROW\nTHRUM\nTHUMB\nTHUMP\nTHYME\nTIARA\nTIBIA\nTIDAL\nTIGER\nTIGHT\nTILDE\nTIMER\nTIMID\nTIPSY\nTITAN\nTITHE\nTITLE\nTOAST\nTODAY\nTODDY\nTOKEN\nTONAL\nTONGA\nTONIC\nTOOTH\nTOPAZ\nTOPIC\nTORCH\nTORSO\nTORUS\nTOTAL\nTOTEM\nTOUCH\nTOUGH\nTOWEL\nTOWER\nTOXIC\nTOXIN\nTRACE\nTRACK\nTRACT\nTRADE\nTRAIL\nTRAIN\nTRAIT\nTRAMP\nTRASH\nTRAWL\nTREAD\nTREAT\nTREND\nTRIAD\nTRIAL\nTRIBE\nTRICE\nTRICK\nTRIED\nTRIPE\nTRITE\nTROLL\nTROOP\nTROPE\nTROUT\nTROVE\nTRUCE\nTRUCK\nTRUER\nTRULY\nTRUMP\nTRUNK\nTRUSS\nTRUST\nTRUTH\nTRYST\nTUBAL\nTUBER\nTULIP\nTULLE\nTUMOR\nTUNIC\nTURBO\nTUTOR\nTWANG\nTWEAK\nTWEED\nTWEET\nTWICE\nTWINE\nTWIRL\nTWIST\nTWIXT\nTYING\nUDDER\nULCER\nULTRA\nUMBRA\nUNCLE\nUNCUT\nUNDER\nUNDID\nUNDUE\nUNFED\nUNFIT\nUNIFY\nUNION\nUNITE\nUNITY\nUNLIT\nUNMET\nUNSET\nUNTIE\nUNTIL\nUNWED\nUNZIP\nUPPER\nUPSET\nURBAN\nURINE\nUSAGE\nUSHER\nUSING\nUSUAL\nUSURP\nUTILE\nUTTER\nVAGUE\nVALET\nVALID\nVALOR\nVALUE\nVALVE\nVAPID\nVAPOR\nVAULT\nVAUNT\nVEGAN\nVENOM\nVENUE\nVERGE\nVERSE\nVERSO\nVERVE\nVICAR\nVIDEO\nVIGIL\nVIGOR\nVILLA\nVINYL\nVIOLA\nVIPER\nVIRAL\nVIRUS\nVISIT\nVISOR\nVISTA\nVITAL\nVIVID\nVIXEN\nVOCAL\nVODKA\nVOGUE\nVOICE\nVOILA\nVOMIT\nVOTER\nVOUCH\nVOWEL\nVYING\nWACKY\nWAFER\nWAGER\nWAGON\nWAIST\nWAIVE\nWALTZ\nWARTY\nWASTE\nWATCH\nWATER\nWAVER\nWAXEN\nWEARY\nWEAVE\nWEDGE\nWEEDY\nWEIGH\nWEIRD\nWELCH\nWELSH\nWHACK\nWHALE\nWHARF\nWHEAT\nWHEEL\nWHELP\nWHERE\nWHICH\nWHIFF\nWHILE\nWHINE\nWHINY\nWHIRL\nWHISK\nWHITE\nWHOLE\nWHOOP\nWHOSE\nWIDEN\nWIDER\nWIDOW\nWIDTH\nWIELD\nWIGHT\nWILLY\nWIMPY\nWINCE\nWINCH\nWINDY\nWISER\nWISPY\nWITCH\nWITTY\nWOKEN\nWOMAN\nWOMEN\nWOODY\nWOOER\nWOOLY\nWOOZY\nWORDY\nWORLD\nWORRY\nWORSE\nWORST\nWORTH\nWOULD\nWOUND\nWOVEN\nWRACK\nWRATH\nWREAK\nWRECK\nWREST\nWRING\nWRIST\nWRITE\nWRONG\nWROTE\nWRUNG\nWRYLY\nYACHT\nYEARN\nYEAST\nYIELD\nYOUNG\nYOUTH\nZEBRA\nZESTY\nZONAL",
    // dictArr: ['ABACK', 'ABASE', 'ABATE', 'ABBEY', 'ABBOT', 'ABHOR', 'ABIDE', 'ABLED', 'ABODE', 'ABORT', 'ABOUT', 'ABOVE', 'ABUSE', 'ABYSS', 'ACORN', 'ACRID', 'ACTOR', 'ACUTE', 'ADAGE', 'ADAPT', 'ADEPT', 'ADMIN', 'ADMIT', 'ADOBE', 'ADOPT', 'ADORE', 'ADORN', 'ADULT', 'AFFIX', 'AFIRE', 'AFOOT', 'AFOUL', 'AFTER', 'AGAIN', 'AGAPE', 'AGATE', 'AGENT', 'AGILE', 'AGING', 'AGLOW', 'AGONY', 'AGREE', 'AHEAD', 'AIDER', 'AISLE', 'ALARM', 'ALBUM', 'ALERT', 'ALGAE', 'ALIBI', 'ALIEN', 'ALIGN', 'ALIKE', 'ALIVE', 'ALLAY', 'ALLEY', 'ALLOT', 'ALLOW', 'ALLOY', 'ALOFT', 'ALONE', 'ALONG', 'ALOOF', 'ALOUD', 'ALPHA', 'ALTAR', 'ALTER', 'AMASS', 'AMAZE', 'AMBER', 'AMBLE', 'AMEND', 'AMISS', 'AMITY', 'AMONG', 'AMPLE', 'AMPLY', 'AMUSE', 'ANGEL', 'ANGER', 'ANGLE', 'ANGRY', 'ANGST', 'ANIME', 'ANKLE', 'ANNEX', 'ANNOY', 'ANNUL', 'ANODE', 'ANTIC', 'ANVIL', 'AORTA', 'APART', 'APHID', 'APING', 'APNEA', 'APPLE', 'APPLY', 'APRON', 'APTLY', …]

};
const wordleDefaultGuesses = {
    // dictStr: 'TESTE\nTESTF\nTESTG\nTESTH',
    // dictArr: ['TESTE', 'TESTF', 'TESTG', 'TESTH']
    dictStr: 'TESTE\nTESTF\nTESTG\nTESTH',
    dictArr: ['TESTE', 'TESTF', 'TESTG', 'TESTH']
};

// The text areas.
const dictionarySolutions = document.querySelector("#solutions");
const dictionaryGuesses = document.querySelector("#guesses");

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// The standard file selector is ugly so hide it and replace it with a button. 
// Add a listener to the button that in turn clicks the hidden selector.
const fileSelect1 = document.getElementById("fileSelect1");
const fileElem1 = document.getElementById("fileElem1");

// Again for the other button.
const fileSelect2 = document.getElementById("fileSelect2");
const fileElem2 = document.getElementById("fileElem2");

// If the button is set to read a file, this passes the click through to the input element.
function clickPassCallback1(e) {
    if (fileElem1) {
        fileElem1.click();
    }
};

// If the button is set to process the text field, process the text and set the button back to file read mode.
function processTextAreaAndResetButton1(e) {
    fileSelect1.innerText = 'Load Solution File';
    fileSelect1.addEventListener("click", clickPassCallback1, false);
    fileSelect1.removeEventListener("click", processTextAreaAndResetButton1, false);
    dictionarySolutions.addEventListener('input', prepareForUpdatedTextArea1, { once: true });
    wordleDefaultSolutions.dictStr = dictionarySolutions.value;
    processDictionary(wordleDefaultSolutions);
    loadCurrentDictionaries();
};

// add listeners to the textareas and change the button behavior if the textarea is updated.
function prepareForUpdatedTextArea1() {
    fileSelect1.innerText = 'Process Dictionary';
    fileSelect1.removeEventListener("click", clickPassCallback1, false);
    fileSelect1.addEventListener("click", processTextAreaAndResetButton1, false);
}

// If the button is set to read a file, this passes the click through to the input element.
function clickPassCallback2(e) {
    if (fileElem2) {
        fileElem2.click();
    }
};

// If the button is set to process the text field, process the text and set the button back to file read mode.
function processTextAreaAndResetButton2(e) {
    fileSelect2.innerText = 'Load Guesses File';
    fileSelect2.addEventListener("click", clickPassCallback2, false);
    fileSelect2.removeEventListener("click", processTextAreaAndResetButton2, false);
    dictionaryGuesses.addEventListener('input', prepareForUpdatedTextArea2, { once: true });
    wordleDefaultGuesses.dictStr = dictionaryGuesses.value;
    processDictionary(wordleDefaultGuesses);
    loadCurrentDictionaries();
};

// add listeners to the textareas and change the button behavior if the textarea is updated.
function prepareForUpdatedTextArea2() {
    fileSelect2.innerText = 'Process Dictionary';
    fileSelect2.removeEventListener("click", clickPassCallback2, false);
    fileSelect2.addEventListener("click", processTextAreaAndResetButton2, false);
}

// Set the buttons up for the first click.
fileSelect1.addEventListener("click", clickPassCallback1, false);
fileSelect2.addEventListener("click", clickPassCallback2, false);

// Set up the textareas to detect updates.
dictionarySolutions.addEventListener('input', prepareForUpdatedTextArea1, { once: true });
dictionaryGuesses.addEventListener('input', prepareForUpdatedTextArea2, { once: true });

// we need references to the callbacks so we can remove them later.
const loadDictCallbackSolutions = loadDictionary(wordleDefaultSolutions);
const loadDictCallbackGuesses = loadDictionary(wordleDefaultGuesses);

// Get file loaders to be ready for the click.
fileElem1.addEventListener("change", loadDictCallbackSolutions, false);
fileElem2.addEventListener("change", loadDictCallbackGuesses, false);

// Populate the textareas for first time on page load.
loadCurrentDictionaries();


// give the tiles focus if the user clicks them.
const allTiles = document.querySelectorAll(".tile");
for (let i = 0; i < allTiles.length; i++) {
    allTiles[i].addEventListener('click', (e) => allTiles[i].focus());
}

// Capture any keypress.
document.addEventListener("keydown", e => {
    handleKeyInput(e);
})

// A closure to use for callbacks that need a particular dictionary.
function loadDictionary(dict) {
    return function () {
        processFileForDict(this.files[0], dict);
    }
}

// use a promise to wrap the file reader to avoid race conditions processing the contents.
function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(file);
    })
}

// Read the file into the dictionary, process the text, and then reload them on the page.
async function processFileForDict(file, dict) {
    try {
        // We want to block here so that we don't process the dictionary before the file contents have loaded into it.
        dict.dictStr = await readFileAsync(file);
        processDictionary(dict);
        loadCurrentDictionaries();
    } catch (err) {
        console.log(err);
    }
}

// Does the work of reading the string value of the dictionary, normalizing it, and then generating an equivalent array with the words.
function processDictionary(dict) {
    // split on any non-alpha chars, remove non-5-letter words, convert to upper case, remove dupes, and sort.
    dict.dictArr = Array.from(
        new Set(dict.dictStr
            .split(/[^A-Za-z]+/)
            .filter(word => word.length === 5)
            .map(word => word.toUpperCase())))
        .sort();
    dict.dictStr = dict.dictArr.join('\n');
}

// When a key is pressed, do special things depending on key and focused element.
function handleKeyInput(e) {
    const focusedElem = document.activeElement;
    if (!focusedElem) return;
    if (focusedElem.classList.contains('tile')) {
        const para = focusedElem.firstElementChild;
        const textLength = para.textContent.length;
        const key = e.key;
        let maxLength = 0
        if (focusedElem.classList.contains('c-tile')) {
            maxLength = 1;
        } else if (focusedElem.classList.contains('m-tile')) {
            maxLength = 12;
        } else {
            maxLength = 26;
        }
        // alert(key);
        if (key === 'Backspace' && textLength > 0) {
            para.textContent = para.textContent.slice(0, textLength - 1);
            formatTileText(para);
        } else if (!(para.textContent.includes(key.toUpperCase())) && ALPHABET.includes(key) && textLength < maxLength) {
            para.textContent += key;
            formatTileText(para);
        }
    }
}

// Handle all the custom formatting we need to make the tiles look good.
function formatTileText(p) {
    const rawText = p.textContent;
    const largeLetter = '40px';
    const mediumLetter = '22px';
    const smallLetter = '16px';
    if (rawText.length <= 1) {
        p.style.fontSize = largeLetter;
        p.textContent = rawText.toUpperCase();
    } else if (rawText.length === 2) {
        p.style.fontSize = mediumLetter;
        p.textContent = rawText.toUpperCase();
    } else if (rawText.length <= 4) {
        p.style.fontSize = mediumLetter;
        p.innerText = rawText.splice(2, '\n').toUpperCase();
    } else if (rawText.length <= 6) {
        p.style.fontSize = mediumLetter;
        p.innerText = rawText.splice(3, '\n').toUpperCase();
    } else if (rawText.length <= 9) {
        p.style.fontSize = smallLetter;
        p.innerText = rawText.splice(3, '\n').splice(7, '\n').toUpperCase();
    } else if (rawText.length <= 12) {
        p.style.fontSize = smallLetter;
        p.innerText = rawText.splice(4, '\n').splice(9, '\n').toUpperCase();
    }
}

// We need some special splicing action for strings. 
if (!String.prototype.splice) {
    /**
     * {JSDoc}
     *
     * Insert a substring at the given start index.
     *
     * @this {String}
     * @param {number} start Index to splice at.
     * @param {string} subStr String to splice in.
     * @return {string} The new string.
     */
    String.prototype.splice = function (start, subStr) {
        return this.slice(0, start) + subStr + this.slice(start);
    };
}

// Update the dictionary textareas from the dictionary variables. Call this anytime the data is manipulated.
function loadCurrentDictionaries() {
    dictionarySolutions.value = wordleDefaultSolutions.dictStr;
    dictionaryGuesses.value = wordleDefaultGuesses.dictStr;
    console.log(wordleDefaultSolutions);
    console.log(wordleDefaultGuesses);
}
//TODO: Delete this.
window.addEventListener('keydown', (e) => {
    console.log(e)
})