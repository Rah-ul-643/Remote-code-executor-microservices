import AceEditor from "react-ace";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/webpack-resolver";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";

import "ace-builds/src-noconflict/theme-twilight";

const CodeEditor = ({ field, changeHandler, options }) => {

  const selectMode = () => {
    if (options.mode === "c" || options.mode === "cpp") {
      return "c_cpp";
    }
    return options.mode;
  };

  return (
    <AceEditor
      mode={selectMode()}
      theme="twilight"
      value={options.value}
      name={options.name}
      width="100%"
      height="95%"
      fontSize={16}
      onChange={(value) => changeHandler(field, value)}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

export default CodeEditor;
