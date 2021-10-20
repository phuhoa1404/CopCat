import React, { Component } from "react";
import Flask from '../api/flask'
import { Hint } from "./Hint";
import { useState,useEffect } from 'react';
import { useToggle } from 'react-use';
import toast from 'react-hot-toast';
import { Loader } from './loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducers';
import { Link, NavLink, useHistory, withRouter } from 'react-router-dom';
import { setData } from './slices/global.slice';
import type { PdfLoader,
    PdfHighlighter,
    Tip,
    Highlight,
    Popup,
    IHighlight,
    Sentences } from "./pdf-highlighter";
import { PDF } from './pdf'
import './commons.scss'



export const Post = () => {
    const [selectedFile, setSelectedFile] = React.useState<File>();
    const [loading, setLoading] = useState(false);
    const [pdfView, setPDFview] = useState(false)
    const history = useHistory<any>();
    const dispatch = useDispatch();

 

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadFile:any = e.target.files?.[0];
        setSelectedFile(uploadFile)

    }

    const handleSubmit = async (e: any) => {
        try{
            e.preventDefault();
            if(!selectedFile) return;
            setLoading(true);
            var formData = new FormData();
            formData.append("file",selectedFile);
            formData.append("filename", selectedFile.name)
            // setPDFview(true);

            const { data: apiResponse } =  await Flask.post('/search',formData);
            console.log("Return", apiResponse)
            patchResponseAPI(apiResponse)
            // window.location.replace('http://localhost:3000/pdf')
        }
        catch (error:any){
            console.log("Error in Upload File:", error)
        }
        finally{
            setLoading(false)
        }
    }

    const patchResponseAPI = async (data:any) => {
        dispatch(setData(data));
        setPDFview(true);
    }

    const jumpPDF = () => {
        history.push("/pdf")
    }


    const pdfHighlight: Array<IHighlight> = []
    const senHighlight: Array<Sentences> = []

    const dataReducer:Array<IHighlight> = useSelector((state: RootState) => state.data.data);
        console.log("Data Reducers:", dataReducer)

    return (
        <div>
            {(!pdfView) ? (
                <div>
                {(loading) && (
                    <div className='loader__component'>
                        <Loader />
                    </div>
                )}
                <div>

                        <span>
                        <input
                            id="PDF"
                            type="file"
                            accept=".pdf"
                            tw="hidden"
                            onChange={handleFile}
                        />
                        <label htmlFor="PDF">
                            <Hint
                            text="Uploading PDF file"
                            align="bottom"
                            >
                            <div className="button btn-primary large" tw="mr-4 ml-8">
                                Upload PDF
                            </div>
                            </Hint>
                        </label>
                        </span>
                    <span>
                        <input id="Submit" type="submit" onClick={handleSubmit} value="Submitting"/>
                        <label htmlFor="Submit">
                        <div className="button btn-primary large" tw="mr-4 ml-8">
                                Submit
                            </div>
                        </label>
                    </span>
                    
                </div>
            </div>
            ) : (
                <div>
                    {/* <Link to="/signup"> */}
                        <button onClick={jumpPDF}>TO PDF!</button>
                    {/* </Link> */}
                </div>
            )}
        </div>
    );
}