import mixpanel from "mixpanel-browser";
import { v4 as uuidv4 } from "uuid";
import { getDataFromStorage, setDataInStorage } from "./utils";

mixpanel.init("ID");

const track = (eventName, params) => {
  try {
    mixpanel.track(eventName, params);
  } catch (e) {}
};

const init = (params = {}) => {
  getDataFromStorage("userInfo", ({ userInfo }) => {
    try {
      if (!userInfo) {
        userInfo = {
          createdAt: new Date().toISOString(),
          userId: uuidv4(),
        };
        setDataInStorage("userInfo", userInfo);
      }
      mixpanel.identify(userInfo.userId);
      mixpanel.people.set(userInfo);
      track("Load", { ...params, activeDomain: url });
    } catch (e) {}
  });
};

export { track, init };
