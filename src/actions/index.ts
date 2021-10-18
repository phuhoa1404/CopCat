export const initLibrary = (data?: any) => {
    return {
      type: "INIT_LIBRARY",
      data: data,
    };
  };
  
  export const fetchLibrary = () => {
    return {
      type: "FETCH_LIBRARY",
      // payload:Comment
    };
  };
  
  export const fetchLibraryNoLoading = (payload?: any) => {
    return {
      type: "FETCH_LIBRARY_NO_LOADING",
      payload,
    };
  };
  
  export const setLibrary = (data: any) => {
    return {
      type: "SET_LIBRARY",
      payload: data,
    };
  };
  export const setLocation = (data: string) => {
    return {
      type: "SET_LOCATION",
      payload: data,
    };
  };
  export const fetchfailedLibrary = () => {
    return {
      type: "FAILED_LIBRARY",
      // payload:data
    };
  };
  
  //login actions
  export const initLogin = (loginData: unknown) => {
    return {
      type: "INIT_LOGIN",
      payload: loginData,
    };
  };
  export const setToken = (token: string | null, username: string | null) => {
    return {
      type: "SET_TOKEN",
      token,
      username,
    };
  };
  export const setTokenFailed = (error: unknown) => {
    return {
      type: "SET_TOKEN_FAILED",
      error,
    };
  };
  
  export const handleStatusAlert = (statusMsg: string, isSuccess: boolean) => {
    return {
      type: "HANDLE_ALERT_DISPLAY",
      statusMsg,
      isSuccess,
    };
  };
  
  export const handleStatusAlertClose = () => {
    return {
      type: "HANDLE_ALERT_CLOSE",
    };
  };
  
  export const handleToggleSearch = (isSearchVisible: boolean) => {
    return {
      type: "TOGGLE_SEARCH_BAR",
      isSearchVisible,
    };
  };
  
  export const handleSearchClick = (searchTerm: string) => {
    return {
      type: "SEARCH_CLICK",
      searchTerm,
    };
  };
  
  export const handleSearchClear = (searchTerm: string) => {
    return {
      type: "SEARCH_CLEAR",
      searchTerm,
    };
  };
  
  export const mediaEventsPlayHandler = (isActive: boolean) => {
    return {
      type: "HANDLE_MEDIA_EVENTS",
      isActive,
    };
  };
  
  export const handleProfilePic = (profilePic: string) => {
    return {
      type: "HANDLE_PROFILE_PIC",
      profilePic,
    };
  };
  
  export const fetchUserProfile = () => {
    return {
      type: "INITIATE_GET_USER_PROFILE_DATA",
    };
  };
  
  export const renameLibraryItem = (payload: any) => ({
    type: "UPDATE_TITLE_SAGA",
    payload,
  });
  
  export const deleteLibraryItems = (mediaidList: string[]) => ({
    type: "INIT_DELETE_LIBRARY_WATCH",
    mediaid: mediaidList,
  });
  
  export const setSelectedRows = (selectedRows: any[]) => ({
    type: "SET_SELECTED_ROWS",
    payload: selectedRows,
  });
  
  export const initSaveUser = (user: any) => ({
    type: "INIT_SAVE_USER",
    user,
  });
  
  export const initEditUser = (user: any) => ({
    type: "INIT_EDIT_USER",
    user,
  });
  export const initGetUser = () => ({ type: "INIT_GET_USER" });