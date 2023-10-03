export const _Basic = [
    {
        key: "providerName",
        label: "Company",
        type: "text",
        defaultValue: "Name of company",
        required: false
    },
    {
        key: "language",
        label: "Language",
        type: "text",
        defaultValue: "en-us",
        required: false
    },
    {
        key: "rating",
        label: "Rating",
        type: "text",
        defaultValue: "G",
        required: false
    },
    {
        key: "ratingSource",
        label: "Rating Source",
        type: "text",
        defaultValue: "USA_PR",
        required: false
    },
]

export const _ShortVideos = [
    {
        key: "maincontent",
        multipleItems: true,
        hassubELements: true,
        subElementHeader: { headerText: "Generic information", type: "Text" },
        subElements: [
            {
                key: "id",
                label: "ID",
                type: "text",
                defaultValue: "identifier for the item",
                required: true
            },
            {
                key: "title",
                label: "Title",
                type: "text",
                defaultValue: "What would you like to name the item",
                required: true
            },

            {
                key: "thumbnail",
                label: "Link to Thumbnail image",
                type: "text",
                defaultValue: "eg: https://image.roku.com/ZHZscHItMTc2/platform-update-qa-V2.jpg",
                required: true
            },
            {
                key: "shortDescription",
                label: "Add a short description",
                type: "text",
                defaultValue: "",
                required: true
            },
            {
                key: "releaseDate",
                label: "Release Date",
                type: "text",
                defaultValue: "",
                required: false
            },
            {
                key: "tags",
                label: "Add tags",
                type: "text",
                defaultValue: "eg: dev-summit,life",
                required: false
            },
            {
                key: "genres",
                label: "Genres",
                type: "text",
                defaultValue: "eg: educational,social",
                required: false
            },
            {
                key: "longDescription",
                label: "Long Description",
                type: "multiline",
                defaultValue: "",
                required: true
            },
        ]
    },    
    {
        key: "content",
        multipleItems: true,
        hassubELements: true,
        subElementHeader: { headerText: "Video Link Section", type: "Text" },
        subElements: [
            {
                key: "dateAdded",
                keyidentifier: "content",
                multipleItems: false,
                label: "dateAdded",
                type: "text",
                defaultValue: "Date of video upload",
                required: true
            },
            {
                key: "videos",
                keyidentifier: "content",
                multipleItems: true,
                hassubELements: true,
                subElementHeader: { headerText: "Videos", type: "Text" },
                subElements: [
                    {
                        key: "videoType",
                        keyidentifier: "videocontent",
                        multipleItems: false,
                        label: "Type of video",
                        type: "text",
                        defaultValue: "eg:MP4",
                        required: true
                    },
                    {
                        key: "url",
                        keyidentifier: "videocontent",
                        multipleItems: false,
                        label: "Video link",
                        type: "text",
                        defaultValue: "Paste video link here",
                        required: true
                    },
                    {
                        key: "quality",
                        keyidentifier: "videocontent",
                        multipleItems: false,
                        label: "Quality of video",
                        type: "text",
                        defaultValue: "eg:HD",
                        required: true
                    }
                ]
            },
            {
                key: "duration",
                keyidentifier: "content",
                multipleItems: false,
                label: "duration",
                type: "text",
                defaultValue: "eg:456",
                required: true
            },
            {
                key: "language",
                keyidentifier: "content",
                multipleItems: false,
                label: "Language",
                type: "text",
                defaultValue: "eg:en-us",
                required: true
            },
        ]
    },
]