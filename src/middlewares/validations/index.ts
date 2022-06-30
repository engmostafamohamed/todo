const valId = require("mongoose").Types.ObjectId;
const rules = {
  id: (req: any, res: any, next: any) => {
    const isValid = valId.isValid(req.params.id);
    if (isValid) {
      next();
      return;
    } else {
      next({
        name: "Validation Error",
        element: "params:id",
        message: "The task id is valid id",
      });
      return;
    }
  },
};
const validate = {
  getOne: [rules.id],
};
module.exports = validate;
// export default validate;
