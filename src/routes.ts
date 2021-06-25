import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticate } from "./middlewares/ensureAuthenticate";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserController } from "./controllers/ListUserController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();
const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUserController = new ListUserController();

router.post(
  "/tags",
  ensureAuthenticate,
  ensureAdmin,
  createTagController.handle
);
router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post(
  "/compliments",
  ensureAuthenticate,
  createComplimentController.handle
);

router.get(
  "/users/compliments/send",
  ensureAuthenticate,
  listUserSendComplimentsController.handle
);
router.get(
  "/users/compliments/receive",
  ensureAuthenticate,
  listUserReceiveComplimentsController.handle
);

router.get("/tags", ensureAuthenticate, listTagsController.handle);
router.get("/users", ensureAuthenticate, listUserController.handle);

export { router };
