import toast from "react-hot-toast";
import { endpoints } from "./endpoints";
import { apiConnector } from "./apiConnector";

const { COMPILE_API } = endpoints

export const submitCode = async (submissionId, code, input, language) => {

    const submissionToastId = toast.loading("Submitting Code...");
    try {
        const response = await apiConnector("POST", COMPILE_API, {
            submissionId,
            code,
            language,
            input,
        })
        .catch(error => {
            console.error("Submission API call failed:", error);
            throw error;
        });

        console.log("SUBMISSION API RESPONSE :", response);

        const execToastID = toast.loading("Executing code...", {duration: 10000});
        return execToastID;
    }
    catch (error) {
        console.log("COMPILE API FAILED:", error);

        if (error.response.status === 500) {
            toast.error("Server Error!");
        }
        else if (error.response.status === 401) {
            window.localStorage.removeItem('token');
            window.location.reload();
        }
        else if (error.response.status === 405) {
            toast.error(error.response.data);
        }
        else if (error.response.status === 429) {
            toast.error("Too many requests! Please wait and try again later.");
        }
        else {
            toast.error("Unknown Network Error. Try again after some time");
        }
    }
    finally {
        toast.dismiss(submissionToastId);
    }
}

export const generateSubmissionId = async (code, input) => {

  const encoder = new TextEncoder();
  const data = encoder.encode(code + "||" + input);

  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}