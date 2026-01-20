import toast from "react-hot-toast";
import { endpoints } from "./endpoints";
import { apiConnector } from "./apiConnector";

const { COMPILE_API } = endpoints

export const submitCode = async (code, input, language) => {
    const submissionToastId = toast.loading("Sumitting Code...");
    
    const submissionId = await generateSubmissionId(code, input);

    try {
        const response = await apiConnector("POST", COMPILE_API, {
            submissionId,
            code,
            language,
            input,
        })
        .catch(error => {
            console.error("apiConnector failed:", error);
            throw error;
        });

        console.log("SUBMISSION API RESPONSE :", response);

        const execToastID = toast.loading("Executing code...")
        return execToastID;
    }
    catch (error) {
        console.log("COMPILE API FAILED:", error);

        if (error.response.status === 400) {
            toast.error("Unknown Network Error. Try again affter some time");
        }
        else if (error.response.status === 401) {
            window.localStorage.removeItem('token');
            window.location.reload();
        }
        else if (error.response.status === 405) {
            toast.error(error.response.data);
        }
        else {
            toast.error("Server Error!");
        }
    }
    finally {
        toast.dismiss(submissionToastId);
    }
}

async function generateSubmissionId(code, input) {

  const encoder = new TextEncoder();
  const data = encoder.encode(code + "||" + input);

  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}