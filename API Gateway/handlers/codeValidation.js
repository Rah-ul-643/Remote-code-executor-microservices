const patterns = {
        python: [
                /import\s+os/i,
                /import\s+sys/i,
                /import\s+subprocess/i,
                /from\s+os\s+import/i,
                /from\s+subprocess\s+import/i,
                /__import__\s*\(/i,
                /open\s*\(/i,
                /eval\s*\(/i,
                /exec\s*\(/i,
        ],

        java: [
                /Runtime\.getRuntime\s*\(\)/i,
                /ProcessBuilder/i,
                /new\s+Process/i,
                /\.exec\s*\(/i,
                /System\.load/i,
                /System\.loadLibrary/i,
        ],

        cpp: [
                /system\s*\(/i,
                /fork\s*\(/i,
                /popen\s*\(/i,
                /execvp?\s*\(/i,
                /unistd\.h/i,
        ],

        c: [
                /system\s*\(/i,
                /fork\s*\(/i,
                /execvp?\s*\(/i,
                /unistd\.h/i,
        ],
}

function stripComments(code, language) {
        if (language === "python") {
                return code.replace(/#.*/g, "");
        }

        // C / C++ / Java
        return code
                .replace(/\/\/.*$/gm, "")
                .replace(/\/\*[\s\S]*?\*\//g, "");
}


function normalize(code) {
        return code
                .toLowerCase()
                .replace(/\s+/g, " ");
}


function checkCodeSanity(code, language) {
        if (!patterns[language]) {
                return false;
        }

        const cleaned = normalize(stripComments(code, language));

        for (const pattern of patterns[language]) {
                if (pattern.test(cleaned)) {
                        return false;
                }
        }

        return true;
}

module.exports = checkCodeSanity;