import { success } from "../../utils/ResponseWapper.js";

export const DemoController = (req, res) => {
  return res.send(success(200, { data: "Some data" }));
};
