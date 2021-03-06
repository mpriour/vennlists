export default class User{
    constructor(info){
        if(!info || typeof info != "object"){
            throw new Error("Invalid constructor. User must be passed an info object to create User instance");
        }
        this.id = info.id;
        this.name = info.name;
        this.handle = info.screen_name;
        this.description = info.description;
        this.profileImg = info.profile_image_url_https.replace("\/", "/");
        this.following = info.following;
    }
}

/*
{
    "id": 17671115,
    "id_str": "17671115",
    "name": "Matt Priour",
    "screen_name": "mattpriour",
    "location": "Kerrville, TX",
    "description": "GIS + Javascript junkie, dad, husband, wildlife biologist and occasional birder",
    "url": "https:\/\/t.co\/ypbDLVgxC4",
    "entities": {
        "url": {
            "urls": [
                {
                    "url": "https:\/\/t.co\/ypbDLVgxC4",
                    "expanded_url": "https:\/\/github.com\/mpriour",
                    "display_url": "github.com\/mpriour",
                    "indices": [
                        0,
                        23
                    ]
                }
            ]
        },
        "description": {
            "urls": []
        }
    },
    "protected": false,
    "followers_count": 1066,
    "friends_count": 571,
    "listed_count": 73,
    "created_at": "Thu Nov 27 06:03:31 +0000 2008",
    "favourites_count": 47,
    "utc_offset": -18000,
    "time_zone": "Central Time (US & Canada)",
    "geo_enabled": true,
    "verified": false,
    "statuses_count": 1963,
    "lang": "en",
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "8B542B",
    "profile_background_image_url": "http:\/\/abs.twimg.com\/images\/themes\/theme8\/bg.gif",
    "profile_background_image_url_https": "https:\/\/abs.twimg.com\/images\/themes\/theme8\/bg.gif",
    "profile_background_tile": false,
    "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/897541379689029633\/faiNgp47_normal.jpg",
    "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/897541379689029633\/faiNgp47_normal.jpg",
    "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/17671115\/1383843638",
    "profile_link_color": "9D582E",
    "profile_sidebar_border_color": "D9B17E",
    "profile_sidebar_fill_color": "EADEAA",
    "profile_text_color": "333333",
    "profile_use_background_image": true,
    "has_extended_profile": false,
    "default_profile": false,
    "default_profile_image": false,
    "following": false,
    "follow_request_sent": false,
    "notifications": false,
    "translator_type": "none"
}
*/