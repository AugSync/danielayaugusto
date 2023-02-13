const QUERIES = {
  GET_EVENTS: `allEvents {
    title
    subtitle
    description(markdown: true)
    idEvent
    order
  }`,
  GET_LANDING: `landing {
    confirmationPlaceHolder
    confirmationText
    attendingText
    date
    detailsText
    locality
    multiInvitations
    singleInvitation
    weddingPhrase
    weddingName(markdown: true)
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
  }`,
  GET_GUESTS: `allGuests {
    id
    invitationUrl
  }`,
  GET_GUEST: (url: string) => `guest(filter: {invitationUrl: {eq: "${url}"}}) {
    name
    numberOfInvites
    share
    photos
    speech
    moon
    invitation
    invitationUrl
    attending
    id
  }`,
};

export default QUERIES;
