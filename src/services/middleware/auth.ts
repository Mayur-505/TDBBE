// src/middleware/auth.ts
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { getStoredToken } from '../EbayService';

dotenv.config();

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1] || '';

        // Verify the token by making a simple API call
        let token = getStoredToken({
            "access_token": "v^1.1#i^1#I^3#p^1#r^0#f^0#t^H4sIAAAAAAAAAOVXa4wTVRRu98UbYlDYEMBmJKCsM73Tmb5GWu1ud6ERdrtMF9YFo/O4s8y2nRln7nS3CcamEAwaIUbCokbhB6AQNWhAlwAhERdfMYqJ7B9DBP5ogsEYDNEY9bZblu5KeG0TN7H9Mbn3nnvud75zzr3ngFzdlKVbVmy5OsM5qWpPDuSqnE56GphSV9sws7pqXq0DlAk49+QW5Wry1T8us4R0yuBWQ8vQNQu6+tIpzeKKkyHCNjVOFyzV4jQhDS0OSRwfWbWS81CAM0wd6ZKeIlyxaIjwMn4mIPiCrF+RGYll8ax2TWdCDxGKqHgZr5f2BiQg+FkGr1uWDWOahQQNhQgP8LAk8JIMnQAsxwIOAMoTCHYRrjXQtFRdwyIUIMJFuFxxr1mG9eZQBcuCJsJKiHAs0sK3RWLR5tbEMneZrnCJBx4JyLZGj5p0GbrWCCkb3vwYqyjN8bYkQcsi3OHhE0Yr5SLXwNwF/CLViuhTfB45IHlFIeiHdEWobNHNtIBujqMwo8qkUhTloIZUlL0Vo5gNsQdKqDRqxSpiUVfh024LKVVRoRkimhsjT0TicSIchZkEtBApl758Yycp+xmWDUBRJIOy3yfJolA6ZlhXieQx5zTpmqwWKLNcrTpqhBgzHMsMU8YMFmrT2syIggp4yuV81xhkfV0Flw770EYbtIJXYRrT4CoOb83/yG6ETFW0ERzRMHahSFCIEAxDlYmxi8VILAVPnxUiNiBkcG53b28v1ctQutnt9gBAuztXreSlDTAtEEXZQq4X5NVbbyDVoikSxDstlUNZA2Ppw5GKAWjdRJj10AEalHgfDSs8dvZfE2U2u0fnQ6XyQxaDIiv4vfg+CkJWBJXIj3ApRN0FHFAUsmRaMJMQGSlBgqSE48xOQ1OVOcareJiAAknZF1RINqgopOiVfSStQAggjmIpGPj/pMntBjoPJROiCkV6haI82tIVT2Z6Mt1GM9+AMmuRpzHd0dD7eGOC9vW0tvs87HK93U4aaX5V6HZz4YbGN6VUzEwCn18pAgq5XhkSVugWgvK4zOMl3YBxPaVK2YnlYMaU44KJso12Fo95mErhz7hMjRhGrFL3daWi+E6uiruzupKv1H/yQt3QKhVXcBPKJklPU4WXh1Ll4dKL0gVcd+BcD1JWRqJMaOm2iStPqq1QjyT0JNTw/Y5MPZWC5hp63JGdTttIEFNwooV4JZwtTLDHh/bjPwNYMD67pOLT8tRES8/KXkp3UGC6Rze7YUfxR+edX4C88zTul0EUkHQDeKiuuqOmejphqQhSlqDJot5HqYJCWWq3hns5E1JJmDUE1aya7fjyGcfDuakr3IdeWJ9vSPRkHZPLeu49T4L6ka57SjU9rawFB/Ovr9TSs+bO8LDAy9CAxW4HXeCB66s19Jyae4/OO/mcOfRRdGgn3AS4OV0XTh6qAzNGhJzOWkdN3unwLV9fHySGbDOmPbp3Ya/c3/EtZ7RvHPgzf+wdz69d32+9XLv+wrp95zY7fS2fzz9/v7zz7O6WS6uPH9zyxy578Dv7wekfv/mi+tPbs559Hk77zL305bR388VPFu+9uPqwd8fC97byxAK5ISplB4de2S3V/bL4kZXnO46cuu/E2f69Z7S/tu07sHHt4VR/0J+JxE8MuBF7cH9wweT6b7Z3flX/afepA7n8h1fW/bB/sPPMuzW/T32rc2NG3ZHc1M7/1sz3D8YuPzbXWFe3eda5XbNnRpZ5dHLJ8bajTy94Pfn1q4nT/iV/D9hHttuRgf2HzHn3/Bx3H/NefeOl2nOXiNea379CLbKaqid9MOzTfwAEJsfVDREAAA==",
            "expires_in": 7200,
            "obtained_at": 1717130402602
        });

        if (token !== null) {
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error: any) {
        if (error.response && error.response.status === 403) {
            res.status(403).json({ error: 'Forbidden', details: error });
        } else if (error.response && error.response.status === 401) {
            res.status(401).json({ error: 'Unauthorized', details: error });
        } else if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Not Found', details: error });
        } else {
            res.status(500).json({ error: 'Internal Server Error', details: error });
        }
    }
};
