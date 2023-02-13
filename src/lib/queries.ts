const QUERIES = {
  GET_LANDING_PAGE: `query GetEvents {
  allEvents {
    title
    subtitle
    description
    order
  }
  landing {
    confirmationPlaceHolder
    confirmationText
    date
    detailsText
    locality
    multiInvitations
    singleInvitation
    weddingPhrase
    weddingName
    photo {
      responsiveImage(imgixParams: {fm: jpg, fit: max, w: 1920, h: 1080}) {
        srcSet
        webpSrcSet
        sizes
        src
        width
        height
        aspectRatio
        alt
        title
        base64
      }
    }
  }
}`,
};

export default QUERIES;
