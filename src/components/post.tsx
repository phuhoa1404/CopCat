import React, { Component } from "react";
import Flask from '../api/flask'
import { Hint } from "./Hint";
import { useState,useEffect } from 'react';
import { useToggle } from 'react-use';
import toast from 'react-hot-toast';
import { Loader } from './loader';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, withRouter } from 'react-router-dom';
import { setData } from './slices/global.slice';
import type { IHighlight} from "./pdf-highlighter";
import {PDF} from './pdf'
import './commons.scss'



export const Post = () => {
    const [selectedFile, setSelectedFile] = React.useState<File>();
    const [loading, setLoading] = useState(false);
    const [pdfView, setPDFview] = useState(false)
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
            formData.append("file",selectedFile,selectedFile?.name);
            const { data: apiResponse } =  await Flask.post('/search',formData);
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

    const pdfHighlight: Array<IHighlight> = []

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
                    <PDF url={"https://duy-sieng-hoa.s3.ap-southeast-1.amazonaws.com/Documents/Test-Highlight.pdf"}
                     highlights={pdfHighlight} />
                </div>
            )}
        </div>
    );
}