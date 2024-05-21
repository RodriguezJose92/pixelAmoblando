class MudiPixel{

    /** Builder OBJECT*/
    constructor(){

        /** General Info  */
        this.testType                       = null; 
        this.userID                         = null; //✔️ 
        this.path                           = null; //✔️
        this.device                         = null; //✔️
        this.detailDevice                   = null; //✔️
        this.date                           = null; //✔️
        this.timeInSession                  = null; //✔️
        this.skuNumber                      = null; //✔️
        this.idCompany                      = 147;  //🟠

        /** Events interaction buttons  */
        this.viewerEvent                    = 0; //✔️
        this.interaction3D                  = 0; //✔️
        this.interactionAR                  = 0; //✔️

        this.addToCar                       = 0; //✔️
        this.purchaseClick                  = 0; //✔️
    
        /** Element DOM Verify and SEND */
        this.category                       = null; //✔️✔️
        this.subCategory                    = null; //✔️✔️

        /** VerifyDoms -- Counters */
        this.verifyAddToCarButton           = 0; //✔️
        this.verifyBreadcrumb               = 0; //✔️
        this.verifyPurchaseButton           = 0; //✔️
        this.verifyContainerMudiBtns        = 0; //✔️
        this.btnARVerify                    = 0; //✔️
        this.verifySkuNumber                = 0; //✔️

        /** IndexDataBase */
        this.DBMudiProducts                 = indexedDB.open('productsMudi', 1);

    };

    /** Build Test AB */
        async verifyTestingAB(){

            /** verify Test */
            let testMudi = localStorage.getItem('UserMudiTest');

            if(testMudi !== null){this.testType = testMudi}
            else{
                /** Petition Server */
                const newBody = {"idCompany": this.idCompany};
                const request = await fetch(`https://viewer.mudi.com.co:3589/api/mudiv1/getInfoTest`,{
                    method:'POST',
                    headers:{"Content-type":"application/json"},
                    body: JSON.stringify(newBody)
                });

                const response = await request.json(); 
                await this.updateTesting(response.data[0].test)
            };

        };

        async updateTesting(lastTest){
            
            /** Updatte testing */
            let testUpdate;
            lastTest == 'A' ? (testUpdate = 'B') : (testUpdate = 'A');
            
            const newBody = {"idCompany": this.idCompany , "typeTest": testUpdate};
            const request = await fetch(`https://viewer.mudi.com.co:3589/api/mudiv1/updateInfoTest`,{
                method:'POST',
                headers:{"Content-type":"application/json"},
                body: JSON.stringify(newBody)
            })

            this.testType = testUpdate;
            localStorage.setItem('UserMudiTest',testUpdate)
        };

    /** Events for DOM verification */

        /** 1. Verify addToCar ✔️ */
        verifyAddToCar(){

            /** Declared DOM Element */
            let 
            element         = document.body.querySelector(`.cart-add`); // CUSTOM ELEMENT ✔️

            /** End process verify  */
            if(this.verifyAddToCarButton > 5000) { console.log("%cMudiPixel:\n","color:#820ad1; font-weight:600","The button to add to cart was not found ❌"); return false;};

            /** Add Evento addToCar || Resend  */
            element 
            ? ( element.parentNode.addEventListener('click',()=>this.addToCar ++) , 
                console.log("%cMudi Pixel: \n","color:#820ad1; font-weight:600","Add To car Correctly setting 🚀" ) ) 
            : ( requestAnimationFrame(this.verifyAddToCar.bind(this)) , this.verifyAddToCarButton ++ );

        };

        /** 2. Verify Categories ✔️ */
        verifyCategory(){

            /** Declared DOM BreadCrumb*/
            let 
            breadcrumb         = document.body.querySelector(`.breadcrumb`); // CUSTOM ELEMENT breadcrumb

            /** End process verify  */
            if(this.verifyBreadcrumb  > 5000) { console.log("%cMudiPixel:\n","color:#820ad1; font-weight:600","Breadcrumb was not found ❌"); return false};
            /** Add Evento addToCar || Resend  */
            breadcrumb 
            ? ( this.category       = breadcrumb.children[1].innerText, 
                this.subCategory    = breadcrumb.children[2].innerText, 
                console.log("%cMudi Pixel: \n","color:#820ad1; font-weight:600","Category Correctly setting 🚀" ) ) 
            : ( requestAnimationFrame(this.verifyCategory.bind(this)) , this.verifyBreadcrumb ++  );
        };

        /** 3. VerifyBuyButton -- Purchase Completion ✔️ */
        verifyPurchase(){

            /** Declared btn Purchase*/
            let 
            purchaseBtn         = document.body.querySelector(`.send-event-purchase`); // CUSTOM ELEMENT breadcrumb

            /** Verify purcahseBtn*/
            if(this.verifyPurchaseButton  > 5000) { console.log("%cMudiPixel:\n","color:#820ad1; font-weight:600","Purchase was not found ❌"); return false};

            /** Add Event Purchase || Resend  */
            purchaseBtn 
            ? ( purchaseBtn.addEventListener('click',()=> this.purchaseClick ++) , 
                this.verifyproductInteractive3D(),
                console.log("%cMudi Pixel: \n","color:#820ad1; font-weight:600","Purchase Correctly setting 🚀" ) ) 
            : ( requestAnimationFrame(this.verifyPurchase.bind(this)) , this.verifyPurchaseButton++  );
        };
            /** 3.1 Verify interaction with products 3D Experience */
            verifyproductInteractive3D(){
                
                const allProductsSkus = document.body.querySelectorAll('.media-content-details')

                for(let i = 0; i<allProductsSkus.length; i++){

                    /** Get SKU NUMBER Cars product to Pay */
                    let productSKU = allProductsSkus[i].querySelector('.col-xs-10').innerHTML;

                    /** Open indexDB */
                    const db            = this.DBMudiProducts.result;
                    const sku           = db.transaction('products','readonly');
                    const objectStore   = sku.objectStore('products');
                    const 
                    cursor              = objectStore.openCursor();
                    let array = [];
        
                    cursor.addEventListener("success",()=>{
                        if(cursor.result){
                            productSKU == cursor.result.value.sku && array.push(productSKU) 
                            cursor.result.continue();
                        }else console.log('consulta realizada');
                    });

                    this.skuNumber=array;
                };
            };

            
        /** 4. Verify container Btns Mudi PDP ✔️ */
        verifyContainerBtnsMudi(){

            /** Declared DOM Container Btns*/
            let 
            containerBtnsMudi         = document.body.querySelector(`.btnsMudiContainer`); // CUSTOM ELEMENT Container Btns

            /** End process verify  */
            if( this.verifyContainerMudiBtns > 1500) { console.log("%cMudiPixel:\n","color:#820ad1; font-weight:600","Container Btns Mudi was not found ❌"); return false};

            /** Add Evento addToCar || Resend  */
            containerBtnsMudi 
            ? ( 
                this.viewerEvent ++ , 
                document.body.querySelector('.btnMudi3D').addEventListener('click',()=>{

                    this.createDB();
                    this.readObjectDB();
                    this.createRegistryDB();

                    this.interaction3D++;
                    this.verifyBtnAR();
                }) ,
                console.log("%cMudi Pixel: \n","color:#820ad1; font-weight:600","Container Btns Mudi Correctly setting 🚀" ) ) 
            : ( requestAnimationFrame(this.verifyContainerBtnsMudi.bind(this)) , this.verifyContainerMudiBtns ++  );

        };

        /** 5. Verify btnAR Mudi PDP ✔️ */
        verifyBtnAR(){

            /** Declared DOM Container Btns*/
            let 
            btnAR         = document.body.querySelector(`.imgBtnAR`), // CUSTOM ELEMENT btn AR
            flagControl   = false;

            /** End process verify  */
            if( this.btnARVerify > 1500) { console.log("%cMudiPixel:\n","color:#820ad1; font-weight:600","Btn Ar mode was not found ❌"); return false};

            /** Add Evento addToCar || Resend  */
            btnAR 
            ? ( 
                btnAR.addEventListener('click',() =>  !flagControl ? ( flagControl = !flagControl , this.interactionAR++ ) : (flagControl = !flagControl) ) ,
                console.log("%cMudi Pixel: \n","color:#820ad1; font-weight:600","Btn AR mode Correctly setting 🚀" ) ) 
            : ( requestAnimationFrame(this.verifyBtnAR.bind(this)) , this.btnARVerify ++  );

        };

        /** 6. Verify SKUNumber */
        verifySku(){

            /** Declared DOM Container Btns*/
            let 
            skuContainer         = document.body.querySelector(`.btnsMudiContainer`)// CUSTOM ELEMENT TEXT SKU

            /** End process verify  */
            if( this.btnARVerify > 1500) { console.log("%cMudiPixel:\n","color:#820ad1; font-weight:600","SkuNumber was not found ❌"); return false};

            /** Add Evento addToCar || Resend  */
            skuContainer 
            ? ( 
                this.skuNumber = skuContainer.getAttribute('skunumber'),
                console.log("%cMudi Pixel: \n","color:#820ad1; font-weight:600","SkuNumber Correctly setting 🚀" ) ) 
            : ( requestAnimationFrame(this.verifySku.bind(this)) , this.verifySkuNumber ++  );

        };


        /** 7. Create Registry and DBIndexed Mudi */
        createDB(){

            this.DBMudiProducts.addEventListener('upgradeneeded',()=>{
                let resultRequest = DBMudiProducts.result;
                resultRequest.createObjectStore('products',{autoIncrement:true});
            });

            this.DBMudiProducts.addEventListener('success',()=>{
                console.log('Todo salió bien')
            });

            this.DBMudiProducts.addEventListener('error',()=>{
                throw new Error('No pudimos abrir ni crear la base de datos del pixel de Mudi')
            });
            
        };
            /** 7.1 Create registyDB */
            createRegistryDB(){
                const db            = this.DBMudiProducts.result;
                const sku           = db.transaction('products','readwrite');
                const objectStore   = sku.objectStore('products');
                objectStore.add({"sku": this.skuNumber , "fechaCreacion": this.date });        
            };

            /** 7.2 DeleteRegistry because date */
            deleteRegistryDB(key){
                const db            = this.DBMudiProducts.result;
                const sku           = db.transaction('products','readwrite');
                const objectStore   = sku.objectStore('products');
                objectStore.delete(key);
            };

            /** 7.3 Read Info productsMudi */
            readObjectDB(){

                const verifydate = (dateMudi,key) =>{
                    const _getYear = new Date().getFullYear()
                    const _getMonth = new Date().getMonth()+1;
                    const _getday = new Date().getDate();
                    const DateMudi = dateMudi.split(' ')[0].split('-');

                    if(_getYear > DateMudi[0] || _getMonth > DateMudi[1] || _getday > DateMudi[2]){
                        this.deleteRegistryDB(key)
                    };
                };
    
                const db            = this.DBMudiProducts.result;
                const sku           = db.transaction('products','readonly');
                const objectStore   = sku.objectStore('products');
                const 
                cursor        = objectStore.openCursor();

                cursor.addEventListener("success",()=>{

                    if (cursor.result){
                        verifydate(cursor.result.value.fechaCreacion , cursor.result.key);
                        cursor.result.continue();
                    }else{
                        console.log('consulta realizada')
                    };
                    
                })
    
            };


    /** Events info General */

        /* 1. identyUser */
        async identifyUserMudi(){

            /* Mudi user storage*/
            let userMudi    = localStorage.getItem('userMudi');

            /* Petition Server */
            const petitionServerMudi = async() =>{

                try {
                    const 
                    request = await fetch('https://viewer.mudi.com.co:3589/api/mudiv1/userAnalitycs');

                    const 
                    response        =  await request.json();

                    localStorage.setItem('userMudi', response.data.insertId)
                    this.userID     = response.data.insertId;

                } catch (error) {
                    throw new Error (error)
                };

            };

            /* Verification user */
            userMudi ? this.userID = userMudi : petitionServerMudi();

        };

        /* 2. Get Path */
        getPath(){this.path = location.href};

        /* 3 & 4. Recognized device */
        recognizeDevice(){

            //** Define Structure Response */
            let response = {
                Device: null ,
                type: `Mobile`
            };
            
            const 
            userAgent   = navigator.userAgent,
            listUA      = userAgent.split(" ");

            /** Better use REGEX ❌ Add TO DO */

            /** OS Android  */
                if(userAgent.toLowerCase().includes('android')){
                    let androidVersion  = listUA[2] + ' ' + listUA[3];
                    let androidModel    = listUA[4] + ' ' + listUA[5];
                    response.Device = `Android ${androidModel} V-${androidVersion}`;
                }

            /** IOS */
                else if (userAgent.toLowerCase().includes('iphone'))    
                    response.Device = `iPhone OS ${listUA[5].split('_').join('.')}`;
                else if (userAgent.toLowerCase().includes('ipad'))      
                    response.Device = `iPad OS ${listUA[5].split('_').join('.')}`;
                else if (userAgent.toLowerCase().includes('Macintosh')) 
                    response.Device = `Macintosh OS ${listUA[6].split('_').join('.')}`;
                
            /** Window */
                else if (listUA[1].toLowerCase().includes('windows')){   
                    response.Device = `Windows V- ${listUA[3].replace(";", " ")} ${listUA[4].replace(";", " ")}`;
                    response.type = `Desk`
                }

            /** Linux */
                else if (userAgent.toLowerCase().includes('linux') && !userAgent.toLowerCase().includes('android')){
                    response.Device = `Linux`; 
                    response.type   = `Desk`;
                }

            /** Unknowled */
                else {
                    response.Device = "Desconocido"
                    response.type   = null;
                };

            this.device             = response.type;
            this.detailDevice       = response.Device;
        };

        /* 5 Get Date -- FORMAT DATETIME AAAA-MM-DD HH:MM:SS  */
        getDate(){

            /** Build Date */
            const dateActual = new Date();

            /** Build information */
            let dateInfo = {
                month           : dateActual.getMonth() + 1,
                day             : dateActual.getDate(),
                year            : dateActual.getFullYear(),
                hour            : dateActual.getHours(),
                minute          : dateActual.getMinutes(),
                seconds         : dateActual.getSeconds()  
            };

            /** Build Date Sesion  dd -- mm -- aa -- ||  hh -- mm -- ss */
            this.date = `${dateInfo.year}-${dateInfo.month<10 ? '0'+ dateInfo.month : dateInfo.month}-${dateInfo.day} ${dateInfo.hour<10 ? '0'+dateInfo.hour : dateInfo.hour}:${dateInfo.minute}:${dateInfo.seconds}`;
        };

        /* 6 time In Session */
        timeSesion(){

            /** Configaration Time */
            let time = {
                hour: 0,
                minutes: 0,
                seconds: 0
            };
        
            setInterval(() => {
        
                /**up one Sec */
                time.seconds++;
        
                /** verify Secs */
                if (time.seconds < 10) {
                    time.seconds = `0${time.seconds}`
                    time.minutes == 0 && (time.minutes = '00')
                    time.hour == 0 && (time.hour = '00')
                }
        
                /** VerifyMinutes */
                if (time.seconds == 60) {
                    time.seconds = '00';
                    time.minutes++;
                    time.minutes < 10 ? time.minutes = `0${time.minutes}` : time.minutes = `${time.minutes}`;
                }
        
                /** Verify hours */
                if (time.minutes == 60) {
                    time.minutes = '00';
                    time.hour++;
                    time.hour < 10 ? time.hour = `0${time.hour}` : time.hour = `${time.hour}`;
                }
        
                this.timeInSession = `${time.hour}:${time.minutes}:${time.seconds}`;
        
            }, 1000);
        };

        /* Event beforeUnload */
        addEventBeforeUnload(){

            window.addEventListener('beforeunload', e => {

                let bodyToSend      = {
                    userID          : this.userID,
                    path            : this.path,
                    device          : this.device,
                    detailDevice    : this.detailDevice,
                    dateMudi        : this.date,
                    timeInSession   : this.timeInSession,
                    viewEvent       : this.viewerEvent,
                    interaction3D   : this.interaction3D,
                    interactionAR   : this.interactionAR,
                    addToCar        : this.addToCar,
                    purchaseClick   : this.purchaseClick,
                    category        : this.category,
                    subCategory     : this.subCategory,
                    skuNumber       : this.skuNumber,
                    idCompany       : this.idCompany,
                    testType        : this.testType
                };

                const request = fetch('https://viewer.mudi.com.co:3589/api/mudiv1/registryPixelMudi',{
                    method:'POST',
                    headers:{"Content-type":"application/json"},
                    body: JSON.stringify(bodyToSend)
                })
   
            })

        };


    /** TurnOn pixel Mudi */
    async pixelMudiOn(){

        await this.identifyUserMudi();

        this.userID && (

            /** Verify Testing AB */
                this.verifyTestingAB(),

            /** DOM VERIFY */

                /** Verify  add To Car */
                this.verifyAddToCar(),
                /** Verify Categories */
                this.verifyCategory(),
                /** Verify skuNumber */
                this.verifySku(),
                /** Verify Ourchase */
                this.verifyPurchase(),

                /** Verify PDP 3D Btn And Evetns interaction 3D  & AR  */
                this.verifyContainerBtnsMudi(),

            /** INFO GENERAL  */

                /* Get Path direction */
                this.getPath(),
                /* Recognized device */
                this.recognizeDevice(),
                /* Get Date */
                this.getDate(),
                /* get Time in Session */ 
                this.timeSesion(),

                /* event To Send */
                this.addEventBeforeUnload()

        );        

    };

};

const 
mudiPixel = new MudiPixel();
window.mudiPixel = mudiPixel;
mudiPixel.pixelMudiOn();


/** https://www.toptal.com/developers/javascript-minifier */