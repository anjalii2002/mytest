var express = require('express')
const app = express();
app.use(express.json())
// app.use(express.urlencoded({extended:true}))
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var cors = require('cors')
app.use(cors())
const cookieParser = require('cookie-parser')

const port = 8000;
app.use(express.urlencoded({ extended: true }));

// third party middleware
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);



// /////////////ADMIN /////////////////////////////////////////////////

const { UserRoute } =require('./Routes/Admin/tbl_user_route');
app.use('/api/admin', UserRoute);

const { RoleRoute } =require('./Routes/Admin/tbl_role_route');
app.use('/api/admin', RoleRoute);

const { roleAssignroute } =require('./Routes/Admin/tbl_role_assign_route');
app.use('/api/admin',roleAssignroute);

const { CategoryRoute } =require('./Routes/Admin/tbl_category_route');
app.use('/api/admin', CategoryRoute);

const { subCategoryroute } =require('./Routes/Admin/tbl_subcategory_route');
app.use('/api/admin', subCategoryroute);

const {RetailerRoute } =require('./Routes/Admin/tbl_retailer_route');
app.use('/api/admin', RetailerRoute);

const { Offerroute } =require('./Routes/Admin/tbl_offer_route');
app.use('/api/admin', Offerroute);

const {userProfileroute}=require('./Routes/Admin/tbl_user_profile_route');
app.use('/api/admin',userProfileroute)

const { CustomerRoute } =require('./Routes/Admin/tbl_customer_route');
app.use('/api/admin', CustomerRoute)



///////////////////////RETAILER/////////////////////

const {   ShopRegistrationroute} =require('./Routes/Retailer/tbl_shopregistration_route');
app.use('/api/retailer',  ShopRegistrationroute);

const {   BankingRoute} =require('./Routes/Retailer/tbl_retailer_banking_route');
app.use('/api/retailer', BankingRoute);

const {   Productroute} =require('./Routes/Retailer/tbl_product_route');
app.use('/api/retailer', Productroute);


app.listen(port,()=>{
    console.log(`server is running on....${port}`)
})