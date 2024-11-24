import { IPOTypes } from "../types/slice_types/ipoSliceTypes";

export const validateCredentials = (
  credential: string,
  credentialType: "name" | "password"
): boolean => {
  let credentialValidationStatus: boolean = false;
  if (credentialType === "name") {
    if (credential.length >= 4 && credential.length <= 10) {
      credentialValidationStatus = true;
    } else {
      credentialValidationStatus = false;
    }
  } else if (credentialType === "password") {
    if (credential.length >= 8 && credential.length <= 20) {
      credentialValidationStatus = true;
    } else {
      credentialValidationStatus = false;
    }
  }
  return credentialValidationStatus;
};

export function createTitleURL(title: string): string {
  const title_lower = title.toLowerCase();
  const titleArr = title_lower.split(" ");
  const newTitle = titleArr.join("-");
  return newTitle;
}

// converts a given string into Indian Number System format
// example : 12345 -> 12,345 , 12345.67 -> 12,345.67
export function createINRString(val: string | number): string {
  // checking for decimal string
  const isDecimal = val.toString().includes(".");

  let currencyString = ""; // empty string this will be updated and returned

  // string formatter into indian number system
  function formatString(valArr: string[]): string[] {
    // for remembering the next position of the comma
    // check below comments for explanation
    let sumFactor = 1;
    // going through the whole string while updating it
    for (let i: number = 0; i < valArr.length; i++) {
      if (i > 0 && i % 2 == 0) {
        if (i + sumFactor < valArr.length) {
          // inserting comma at required place after the actual arr is morphed
          valArr.splice(i + sumFactor, 0, ",");
          // increasing step by one since the original arr is increased by
          // 1 length after inserting ,
          sumFactor++;
        }
      }
    }
    return valArr; // morphed original
  }
  // string is not decimal
  if (!isDecimal) {
    // converting to reverse string array since comma are placed from left side
    const valArr: string[] = val.toString().split("").reverse();
    // formatting the reverse string
    const formattedStringArr = formatString(valArr);
    // creating currency string
    currencyString = formattedStringArr.reverse().join("").toString();
  }
  // string is decimal
  else {
    // dividing it into 2 parts from the decimal
    const currencyArr: string[] = val.toString().split(".");
    // the first part is the part where comma are placed
    const valArr: string[] = currencyArr[0].split("").reverse();
    // formatting the first part
    const formattedStringArr = formatString(valArr);
    // creating currency string and also joining the rest of the decimal part
    currencyString = formattedStringArr
      .reverse()
      .join("")
      .toString()
      .concat(".", currencyArr[1]);
  }
  // returning the currency
  return currencyString;
}

// search function for posts searching
export function searchRelatedPosts(query: string, posts: any): any {
  // to do optimization
  const QueryRelatedPostsIdArr: string[] = [];
  const ResultArr: any[] = [];
  const queryToSearch = query.toString().trim().toLowerCase();

  posts.map((post: any, postIndex: number) => {
    const {
      _id,
      postTitle,
      postImage,
      postDescription,
      postAuthors,
    }: {
      _id: string;
      postTitle: string;
      postImage: { caption: string };
      postDescription: string;
      postAuthors: string[];
    } = post;
    const { caption }: { caption: string } = postImage;

    if (
      // queryToSearch
      postTitle.toLowerCase().includes(queryToSearch) ||
      postTitle.toLowerCase().includes(queryToSearch) ||
      postDescription.toLowerCase().includes(queryToSearch) ||
      caption.toLowerCase().includes(queryToSearch)
    ) {
      QueryRelatedPostsIdArr.push(_id);
    }

    postAuthors.map((author: string) => {
      if (author.toLowerCase().includes(queryToSearch)) {
        QueryRelatedPostsIdArr.push(_id);
      }
    });
  });

  for (let relatedPostId of QueryRelatedPostsIdArr) {
    for (let post of posts) {
      if (post._id === relatedPostId) {
        ResultArr.push(post);
      }
    }
  }

  return ResultArr;
}

export function searchIPO(query: string, ipoCards: any[]) {
  const queryToSearch = query.toString().trim().toLowerCase();
  console.log(query);
  let resultQueryArr: any[] = [];
  let relatedIPOArr: any[] = [];
  ipoCards.map((ipo) => {
    if (ipo.name.toString().trim().toLowerCase().includes(queryToSearch)) {
      relatedIPOArr.push(ipo._id);
    }
  });

  for (let relatedId of relatedIPOArr) {
    for (let ipoCard of ipoCards) {
      if (ipoCard._id === relatedId) {
        resultQueryArr.push(ipoCard);
      }
    }
  }

  return resultQueryArr;
}
