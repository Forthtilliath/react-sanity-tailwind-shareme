export type TImage = {
    _id: string;
    url: string;
    // assetId: string;
    // extension: string,
  };
  export type TPostedBy = {
    _id: string;
    _ref: string;
    userName: string;
    image: string;
  };
  export type TSave = {
    postedBy: TPostedBy;
  };
  export type TComment = {
    postedBy: TPostedBy;
    comment: string;
  };
  export type TPin = {
    _id: string;
    postedBy: TPostedBy;
    image: {
      asset: {
        url: string;
      };
    };
    destination: string;
    save: TSave[];
    title: string;
    about: string;
    comments: TComment[];
  };