const axios = require("axios");

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:5000";

const handleAuth = async (req, res) => {

        // TODO : Replace http forwarding with gRPC calls for better performance.

        try {
                // Forward request to Auth Service
                const targetUrl = `${AUTH_SERVICE_URL}${req.originalUrl}`;

                const response = await axios({
                        method: req.method,
                        url: targetUrl,
                        data: req.body,
                        headers: {
                                "Content-Type": "application/json",
                                Cookie: req.headers.cookie || "",
                        },
                        withCredentials: true,
                });

                // Forward cookies (if any)
                if (response.headers["set-cookie"]) {
                        res.setHeader("set-cookie", response.headers["set-cookie"]);
                }

                // Return auth service response as-is
                return res.status(response.status).json(response.data);
        }

        catch (error) {
                // Auth service error
                if (error.response) {
                        return res
                                .status(error.response.status)
                                .json(error.response.data);
                }

                // Network / service down
                console.error("Auth service unreachable:", error.message);
                return res.status(502).json({
                        error: "Authentication service unavailable",
                });
        }
};

module.exports = handleAuth;
