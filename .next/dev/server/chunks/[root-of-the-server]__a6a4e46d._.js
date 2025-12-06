module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createFollower",
    ()=>createFollower,
    "getFollowerByEmail",
    ()=>getFollowerByEmail,
    "updateFollowerSubscription",
    ()=>updateFollowerSubscription,
    "validateApiKey",
    ()=>validateApiKey
]);
// Demo followers store - replace with database in production
const followers = new Map();
// Add a demo follower for testing
const demoFollower = {
    id: "follower_demo",
    email: "demo@example.com",
    apiKey: "demo_api_key_12345",
    subscriptionTier: "pro",
    subscriptionStatus: "active",
    maxAccounts: 5,
    connectedAccounts: 1,
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString()
};
followers.set(demoFollower.apiKey, demoFollower);
function validateApiKey(apiKey) {
    const follower = followers.get(apiKey);
    if (!follower) return null;
    if (follower.subscriptionStatus !== "active") return null;
    // Update last active
    follower.lastActive = new Date().toISOString();
    return follower;
}
function createFollower(email, tier) {
    const maxAccounts = tier === "starter" ? 1 : 3;
    const apiKey = `fbc_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
    const follower = {
        id: `follower_${Date.now()}`,
        email,
        apiKey,
        subscriptionTier: tier,
        subscriptionStatus: "active",
        maxAccounts,
        connectedAccounts: 0,
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
    };
    followers.set(apiKey, follower);
    return follower;
}
function getFollowerByEmail(email) {
    for (const follower of followers.values()){
        if (follower.email === email) return follower;
    }
    return null;
}
function updateFollowerSubscription(apiKey, status) {
    const follower = followers.get(apiKey);
    if (!follower) return false;
    follower.subscriptionStatus = status;
    return true;
}
}),
"[project]/app/api/auth/register/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    const { email, password, plan } = await request.json();
    if (!email || !password || !plan) {
        const response = {
            success: false,
            error: "Email, password, and plan are required",
            timestamp: new Date().toISOString()
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response, {
            status: 400
        });
    }
    // Check if user already exists
    const existing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFollowerByEmail"])(email);
    if (existing) {
        const response = {
            success: false,
            error: "An account with this email already exists",
            timestamp: new Date().toISOString()
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response, {
            status: 409
        });
    }
    // Create follower (subscription starts as inactive until payment)
    const follower = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createFollower"])(email, plan);
    // In production: hash password and store in database
    const response = {
        success: true,
        data: {
            userId: follower.id,
            email: follower.email
        },
        timestamp: new Date().toISOString()
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a6a4e46d._.js.map