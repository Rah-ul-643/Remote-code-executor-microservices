const validatePython = [
  "import os",
  "import subprocess",
  "from os import",
  "from subprocess import",
];

const validateCpp = ["popen", "fork", "system(", "unistd.h"];

const validateC = ["fork", "system("];

const validateJava = [
  "Process",
  "getRuntime()",
  "exec(",
  "ProcessBuilder",
  "start()",
];

const checkCodeSanity = (code, language) => {
  let result = true;
  blacklist = '';

  switch (language) {

    case 'python':
      blacklist = validatePython
      break;

    case 'java':
      blacklist = validateJava
      break;

    case 'cpp':
      blacklist = validateCpp
      break;

    case 'c':
      blacklist = validateC
      break;

    default:
      break;
  }

  blacklist.forEach((ele) => {
    if (code.includes(ele)) {
      result = false;
      console.log("This code contains malicious content");
      return;
    }
  });
  return result;
};

module.exports = checkCodeSanity;