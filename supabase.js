var SUPABASE_URL = "https://supabase.co"; 
var SUPABASE_ANON_KEY = "sb_publishable_9ezOuadFGRZfHWCChMhVUA_huKgJSr-"; 

var supabaseClientInstance = null;

function getSupabaseInstance() {
    if (!supabaseClientInstance && typeof supabase !== 'undefined') {
        supabaseClientInstance = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabaseClientInstance;
}

// 🛡️ REPAIRED BULLETPROOF SESSION MATRIX TRACKER
async function checkUserSession() {
    var client = getSupabaseInstance();
    
    // Fallback Loop: Wait up to 3 seconds for core variables to connect cleanly
    var verificationAttempts = 0;
    while (!client && verificationAttempts < 10) {
        await new Promise(function(resolve) { setTimeout(resolve, 300); });
        client = getSupabaseInstance();
        verificationAttempts++;
    }
    
    if (!client) {
        console.error("Supabase Core Engine Initialization Timed Out.");
        return null;
    }

    try {
        // Fixed: Query session parameters directly from verified root instantiation context references
        var sessionResult = await client.auth.getSession();
        
        if (sessionResult.error || !sessionResult.data || !sessionResult.data.session) {
            window.location.href = "login.html";
            return null;
        }
        
        return sessionResult.data.session.user;
    } catch (fault) {
        console.error("Session evaluation pipeline exception:", fault);
        window.location.href = "login.html";
        return null;
    }
}

async function fetchUserProfile(userId) {
    var client = getSupabaseInstance();
    if (!client) return null;

    try {
        var profileResult = await client
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
            
        if (profileResult.error) {
            console.error("Profile Ingestion Fault:", profileResult.error.message);
            return null;
        }
        return profileResult.data;
    } catch (error) {
        console.error("Profile matching query failure:", error);
        return null;
    }
}

