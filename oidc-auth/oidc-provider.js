const express = require('express');
const Provider = require('oidc-provider');

const oidcProvider = express();



const configuration = {
    features: {
        discovery: true,
        registration: { initialAccessToken: true },
    },

    format: { default: 'opaque' },

    claims: {
        address: ['address'],
        email: ['email', 'email_verified'],
        phone: ['phone_number', 'phone_number_verified'],
        profile: ['birthdate', 'family_name', 'gender', 'given_name', 'locale', 'middle_name', 'name',
            'nickname', 'picture', 'preferred_username', 'profile', 'updated_at', 'website', 'zoneinfo'],
    },

    async findById(ctx, id) {
        return {
            accountId: id,
            async claims(use, scope) { return { sub: id }; },
        };
    }
};

const oidc = new Provider('http://localhost:3200', configuration);


let server;
(async () => {
    await oidc.initialize({
        keystore: {
            keys: [
                {   kty: 'RSA',
                    kid: 'DRF7E1W4tu5i_Zhz7Zj4NR5RtGbW6aA6aVOWIZhlhBM',
                    use: 'sig',
                    alg: 'RS256',
                    e: 'AQAB',
                    n: '0QFfiHuBVwEWFxewI7_baKrH0XcLcbX8X_WM1KcR0FAnm88I4-oayLvpA62Oel7ldO_h5zBAX4b0rozLrwoEuftKxC36bGQAtax68jTsO-TuYWBGgI7ylcCvIfn4cHEqy0-V6taTXnIMVdb0K3l0ppPsVFTw4uhxB9tBZkR3uGWAvSW0P5S2eOLA0CDFqMDyLKZW1xzBWqAUFnd1NPT6W-s5SJLoGrXEbvCJdEkjeHMoND212f19sVAsnDQZeC524vDmW_ZpueaBeu6dFz50NUshfeTs3Ouv-3EXwvDMjyoOKsXLUbxuOOnljY_QhzelUpnLDlM3aHKGq36rm9LAWQ',
                    d: 'ohfpioUWk26BPlmdvqwOMwe4PsiPtJnKaHWcylPkKeXwQhN4NqKaMTIjDjotNNSiKmXckptGYY_d9f21_kPL1J2Cp9Fs1WFdd4iUNYI78FulURoEs7Gpi-DLMpOWTUZHRTSs9VuDIY1b6bry1UC16nbwo5rY03IoL0qpVvIk03lkw6OZcXYno-BprEyY_uDZhKYVj2vNAWhxnV-FVj99mNqx1y8CynmMNZfkA3GzAT0Y9Wcq7r51ypqhlGiykdUdTWNeTNTnV9rsvAA0JXY_HdJgCBP2trL_r3T-E9dIyovxjfH0LC_RuUix9w6J50TMrdQ1hz03JtYnC38sBuuqgQ',
                    p: '_pyDyH0w1l6hZ3nirvX609EXc1Seo8bYbFlhf0IKQzx8HsQPDuzoiffUn2kEgU-tjjmuxmCrxz-XvzHqmLPHs6fDJ7zC6K8CQd6IgqydfW5lONyj93CzErJFNZflhncIxqbEbbT3KxioQVaGsMWOw7G5y3moUEgOwCtmXOCC5qk',
                    q: '0iUvEFNO0k6Q68FH7cr_AtWrdK4HKrY_rz6EnkvmpsgybuC49yelJytCzz9DaYwR3G4rgmoycn0kOhDeizxd8VRZRKwmRZSfp-QYstQa70WdH8tlUdKUCdwJuNAMoCBBabchV9HJbZHXgIGOVvmHN2PbJCUWAt0DKsw9E-ryCjE',
                    dp: 'MwiMIZN2RoGROHxlw0vqiqpOWP-NDKa-mnkP4cIK7I8jEceafRNfSMg0Bf-2t3SRBQDq1zhpNfa5I8mNjC38yTXHGB_tsVXizfEcy5RtvMZz44HWG7KrMgQpeySHDPyu9aJXnOW45Rp8HxyIwsXWZ8MnynEIG49V5Y7NZbBajIE',
                    dq: 'iNj6GxGFROMw8LX_V1VYV8o5S1SBCkmAk2iNCGC5JWc9oILrMNg6bpV3fmreRX-Xqgp8fwMVMwVXcBDIO7fmHWAmedf5XFp61eRuSRZjK-oTdj8IDg6ppPoLwrSJZEVdE7DUH9JX7-iHhAHaZb09Vs7KSHF2MgsnItm59JyNXiE',
                    qi: '5XYzKRycYgp5zShITKsH2wXkl5xvMKYAfMkwojMEnC7O_-5VMczyIGnVrE-QX404CB3e6FnabprZIAuLJtGuimv0JuM1Vb32liFjbGVFe1A6kvirXTxYJNUm5h8SzJxxyjVEgt9WEKcszSVxy_WqXUvKCMhu8MNySn90nBm0LZk'
                }
            ]
        },

        client: [{
            client_id: 'activity_pub_app',
            response_types: ['id_token'],
            redirect_uris: ['localhost:3102/user'],
            token_endpoint_auth_method: 'none'
        }]
    });

    server = oidcProvider.listen(3200, () => {
        console.log(`application is listening on port 3200, check it's /.well-known/openid-configuration`);
    });

})().catch((err) => {
    if (server && server.listening) server.close();
    console.error(err);
    process.exitCode = 1;
});
