export type TWeddingEvent = {
  title: string;
  subtitle: string;
  description: string;
  order: number;

  descriptionHtml: string;
};

export type TWeddingLanding = {
  confirmationPlaceHolder: string;
  confirmationText: string;
  date: string;
  detailsText: string;
  locality: string;
  multiInvitations: string;
  singleInvitation: string;
  weddingPhrase: string;
  weddingName: string;
  photo: {
    responsiveImage: {
      srcSet: string;
      webpSrcSet: string;
      sizes: string;
      src: string;
      width: number;
      height: number;
      aspectRatio: number;
      alt: string;
      title: string;
      base64: string;
    };
  };
};
