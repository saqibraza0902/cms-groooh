export const config = {
  readonly: false,
  spellcheck: true,
  iframe: true,
  toolbarSticky: false,
  allowScritp: true,
  enableDragAndDropFileToEditor: true,
  uploader: {
    insertImageAsBase64URI: true,
    imagesExtensions: ["jpg", "png", "jpeg", "gif", "webp"],
    withCredentials: false,
    format: "json",
    method: "POST",
    url: "/uploadImage",
    filesVariableName: function (r: any) {
      return "images";
    },
    prepareData: (formData: any) => {
      return formData;
    },
    isSuccess: (response: any) => {
      return response && response.url;
    },
    getMessage: (response: any) => {
      return response.url;
    },
  },
};
