const express = require ('express');
const router = express.Router();

const boardsController = require("../controllers/boardsController");
const listsController = require('../controllers/listsController');
const cardsController = require('../controllers/cardsController');
const commentsController = require('../controllers/commentsController');

const { validateBoard } = require("../validators/validators");
const { validateList } = require('../validators/validators');

router.get('/boards', boardsController.getBoards);
router.get('/boards/:id', boardsController.getBoard);
router.post('/boards', validateBoard, boardsController.createBoard );

router.post('/lists', validateList,listsController.createList, listsController.addListToBoard);
router.put('/lists/:id', listsController.updateList);


router.get('/cards/:id', cardsController.getCard);
router.post('/cards', cardsController.createCard, cardsController.createAction, cardsController.addAction, cardsController.addCard, cardsController.sendCard);
// router.put('/cards/:id', cardsController.updateCard);

router.post('/comments', commentsController.createComment)

module.exports = router;