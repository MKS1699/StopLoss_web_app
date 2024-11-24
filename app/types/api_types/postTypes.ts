/* Types for the Post */
export interface APIPOSTTypes {
  postTitle: string;
  postAuthors: string[];
  postType:
    | "ipo"
    | "news"
    | "tutorial"
    | "blog"
    | "sponsored_post"
    | "company_profile"
    | "";
  postCreated?: Date | string;
  postUpdated?: Date | string;
  postImage: Image;
  hasImage: boolean;
  postParagraphs: Paragraph[];
  postTags: string[];
  postDescription: string;
  postInfo: {
    upcomingIPO: boolean;
    ipoName: string;
    open: string;
    close: string;
    linkedPostsId: string[];
  };
  createdBy: {
    name: string;
    id: string;
  };
  postStatus: {
    publish: boolean;
  };
  postExternalLinks: string[];
  _id: string;
  __v: number;
}

// Paragraph Types of the post
export interface Paragraph {
  paraHeading?: string;
  paraSubHeading?: string;
  paraBody: string;
  hasImages: boolean;
  paraImages: Image[];
  hasTable: boolean;
  paraTable: Table;
}

// Image Types for the post
export interface Image {
  links: {
    original: string;
    medium?: string;
    thumbnail?: string;
  };
  caption: string;
}

// Table Types for the post
export type Table = string[][];

const IMAGE: Image = {
  links: {
    original: "",
    medium: "",
    thumbnail: "",
  },
  caption: "",
};

// 3x3 Table
const TABLE: Table = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

// paragraph
const PARAGRAPH: Paragraph = {
  paraHeading: "",
  paraSubHeading: "",
  paraBody: "",
  hasImages: false,
  paraImages: [
    {
      links: {
        original: "",
        medium: "",
        thumbnail: "",
      },
      caption: "",
    },
  ],
  hasTable: false,
  paraTable: TABLE,
};

// EMPTY STATE
export const EMPTYAPIPOSTSTATE: APIPOSTTypes = {
  _id: "",
  __v: -1,
  postAuthors: [""],
  postTitle: "",
  postDescription: "",
  postType: "",
  postCreated: "",
  postUpdated: "",
  postImage: IMAGE,
  hasImage: false,
  postParagraphs: [PARAGRAPH],
  postTags: [""],
  postInfo: {
    upcomingIPO: false,
    ipoName: "",
    open: "",
    close: "",
    linkedPostsId: [""],
  },
  createdBy: {
    name: "",
    id: "",
  },
  postStatus: {
    publish: false,
  },
  postExternalLinks: [""],
};
