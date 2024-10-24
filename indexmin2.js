const pixelMudi = module.exports;
const { getTimestamp } = require("../../../services/dateUtils");
const DB = require("../../../services/mysql");
const { createPurchase } = require("../../../services/purchaseRegistrySerivce");
const ReviewResponse = require('../../middleWare/ReviewResponse');

/** create user Mark */
pixelMudi.createUser = (req, res) => {

    /** queryConsult */
    const queryConsult = `INSERT INTO registryUserAnalytics VALUES ()`;

    /** Hacemos la consulta al servidor */
    DB.query(queryConsult, (err, data) => {
        if (err) throw err;
        ReviewResponse.userAnalytics({ data, res, body: req.body })
    });
};

/** Create registry pixel */
pixelMudi.createregistry = (req, res) => {
    const timestamp = getTimestamp();
    const {
        userID,
        path,
        device,
        detailDevice,
        dateMudi,
        timeInSession,
        viewEvent,
        interaction3D,
        interactionAR,
        addToCar,
        purchaseClick,
        category,
        subCategory,
        skuNumber,
        idCompany,
        testType,
        interaction3Dplp,
        interactionDetails
    } = req.body;

    const queryConsult = `INSERT INTO registryPixel (
        userID, 
        path, 
        device, 
        detailDevice, 
        dateMudi , 
        timeInSession, 
        viewEvent, 
        interaction3D, 
        interactionAR, 
        addToCar,
        purchaseClick, 
        category, 
        subCategory, 
        skuNumber, 
        idCompany,
        testType,
        interaction3Dplp,
        interactionDetails,
        created_at
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    /** Doing request to DB */
    DB.query(queryConsult, [
        userID,
        path,
        device,
        detailDevice,
        dateMudi,
        timeInSession,
        viewEvent,
        interaction3D,
        interactionAR,
        addToCar,
        purchaseClick,
        category,
        subCategory,
        skuNumber,
        idCompany,
        testType,
        interaction3Dplp,
        interactionDetails,
        timestamp
    ], (err, data) => {
        if (err) throw err;
        ReviewResponse.registryPixel({ data, res, body: req.body });
    });
};


/** Create Data purchase */
pixelMudi.createRegistryPurchase = async (req, res) => {
    const { idCompany, userID, total, path, products} = req.body

    try {
        await createPurchase({purchase: {idCompany, orderId, userID, total, path}, details: products});
        res.json({message: "success"});
    } catch (e) {
        res.json({ message: "Fallo", error: e });
    }
};



/** Usabilidad Consulta */
pixelMudi.usabilityRequest = (req, res) => {

    /** Variables */
    let
        tienda = '',
        interacionSQL = '';

    const { shopper, test, viewEvent, interaction } = req.body;

    /** Filtro por tienda */
    shopper !== '' && (tienda = `AND path LIKE '%${shopper}%' `);
    interaction !== '' && (interacionSQL = `AND interaction3D ${interaction} 0`);

    const queryConsult = `SELECT COUNT(*) AS sessions FROM registryPixel WHERE testType LIKE '${test}' AND viewEvent ${viewEvent} 0 ${interacionSQL} ${tienda}`;
    DB.query(queryConsult, (err, data) => {
        if (err) throw err;
        res.json(data)
    })

};

/** Consulta de engagemen  */
pixelMudi.engagementRequest = (req, res) => {

    /** Variables */
    let
        tienda = '',
        interacionSQL = '';

    const { shopper, test, viewEvent, interaction } = req.body;

    /** Filtro por tienda */
    shopper !== '' && (tienda = `AND path LIKE '%${shopper}%' `);
    interaction !== '' && (interacionSQL = `AND interaction3D ${interaction} 0`);

    const queryConsult = `SELECT SEC_TO_TIME(ROUND(AVG(TIME_TO_SEC(timeInSession)))) AS time FROM registryPixel WHERE testType LIKE '${test}' AND viewEvent ${viewEvent} 0 ${interacionSQL} ${tienda}`;
    DB.query(queryConsult, (err, data) => {
        if (err) throw err;
        res.json(data)
    });

};

/** Consulta de AddToCar */
pixelMudi.addToCartRequest = (req, res) => {

    /** Variables */
    let
        tienda = '',
        interacionSQL = '',
        addToCarSQL = '';

    const { shopper, test, viewEvent, interaction, addToCar } = req.body;

    /** Filtro por tienda */
    shopper !== '' && (tienda = `AND path LIKE '%${shopper}%' `);
    interaction !== '' && (interacionSQL = `AND interaction3D ${interaction} 0`);
    addToCar !== '' && (addToCarSQL = `AND addToCar ${addToCar} 0`);

    const queryConsult = `SELECT COUNT(*) AS addToCar FROM registryPixel WHERE testType LIKE '${test}' AND viewEvent ${viewEvent} 0 ${interacionSQL} ${addToCarSQL} ${tienda}`;
    DB.query(queryConsult, (err, data) => {
        if (err) throw err;
        res.json(data)
    });

};

/** Consulta de Purcharse  */
pixelMudi.purchaseRequest = (req, res) => {

    /** Variables */
    let
        tienda = '',
        interacionSQL = '',
        purchaseSQL = '';

    const { shopper, test, purchase } = req.body;

    /** Filtro por tienda */
    shopper !== '' && (tienda = `AND path LIKE '%${shopper}%' `);
    purchase !== '' && (purchaseSQL = `purchaseClick ${purchase} 0`);

    const queryConsult = `SELECT COUNT(*) AS purchase FROM registryPixel WHERE ${purchaseSQL} AND testType LIKE '${test}' ${tienda} AND path LIKE '%checkout%'`;
    console.log(queryConsult)
    DB.query(queryConsult, (err, data) => {
        if (err) throw err;
        res.json(data)
    });

};
