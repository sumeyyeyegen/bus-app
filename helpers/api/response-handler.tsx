import { authService } from "../../services"

export { responseHandler };

function responseHandler(response: Object | string | any) {
  if (response.statusText !== "OK") {
    if ([401].includes(response.status) && authService.userValue) {
      // auto logout if 401 Unauthorized
      authService.logout();
    }
    // const error = (data && data.message) || response.statusText;
    // return Promise.reject(error);
  } else {
    return response;
  }
}