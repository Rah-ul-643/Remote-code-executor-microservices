import  { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { compileCode } from '../services/codeAPIs';

import * as EditorUtilityStyles from "./styled-components/EditorUtility.styles";

const {
    MainControl,
    MainControlSec,
    MainControlButton,
    MainControlInput,
    MainControlModel,
    Button,
    CustomSelect,

} = EditorUtilityStyles


const EditorUtilityBar = ({ formData, currFile, changeHandler }) => {

    const [selectedLanguage, setSelectedLanguage] = useState("python");
    const index = formData.files.findIndex((file) => file.id === currFile);

    useEffect(() => {
        setSelectedLanguage(formData.files[index].language);
    }, [formData.files, index])

    // handlers


    const handleLanguageChange = (e) => {
        resetToTemplate(e.target.value);
    };

    const resetToTemplate = (lang) => {
        
        let defaultCode = "// your code goes here";

        switch (lang) {
            case 'python':
                defaultCode = "print('Hello, World!')";
                break;
            case 'cpp':
                defaultCode = "#include <iostream>\nusing namespace std;\n \nint main() {\n\t// your code goes here\nreturn 0;\n}";
                break;
            case 'java':
                defaultCode = "public class Main {\n\tpublic static void main(String[] args) {\n\t\t// your code goes here\n\t}\n}";
                break;
            case 'c':
                defaultCode = "#include <stdio.h>\nint main() {\n\t// your code goes here\nreturn 0;\n}";
                break;
            default:
                defaultCode = "// your code goes here";
        }

        const updatedFiles = formData.files.map((file) => file.id === currFile ? { ...file, language: lang, code: defaultCode } : file);
        console.log(updatedFiles);

        changeHandler('files', updatedFiles);


    };


    const resetHandler = (e) => {
        e.preventDefault();
        changeHandler('output', '');
        changeHandler('input', '');

        resetToTemplate(selectedLanguage);
    };


    const handleFileUpload = (event) => {

        const fileExtensions = {
            python: 'py',
            cpp: 'cpp',
            java: 'java',
            c: 'c'
        };

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();
        const fileType = file.name.split('.').pop();

        if (fileType !== fileExtensions[selectedLanguage]) {
            toast.error("Please upload file type of specified language!");
            return;
        }

        reader.onload = (e) => {
            const updatedFiles = formData.files.map((f) => f.id === currFile ? { ...f, code: e.target.result } : f);
            changeHandler('files', updatedFiles);

        };

        reader.readAsText(file);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log("Compiling code...");
            console.log(formData.files[index]);          
            const compiledOutput = await compileCode(formData.files[index].code, formData.input, formData.files[index].language);
            changeHandler('output', compiledOutput);
        } catch (error) {
            console.log("Error in compiling code", error);
        }
    };


    return (
        <MainControl>
            <MainControlSec>
                <MainControlInput type="file" onChange={handleFileUpload} />
            </MainControlSec>
            <MainControlSec>
                <MainControlModel>
                    <CustomSelect value={selectedLanguage} onChange={handleLanguageChange}>
                        <option value="python">Python</option>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="c">C</option>
                    </CustomSelect>

                </MainControlModel>
            </MainControlSec>
            <MainControlSec>
                <MainControlButton onClick={resetHandler}>Reset</MainControlButton>
            </MainControlSec>
            <MainControlSec>
                <Button onClick={submitHandler}>Run</Button>
            </MainControlSec>
        </MainControl>
    )
}

export default EditorUtilityBar;