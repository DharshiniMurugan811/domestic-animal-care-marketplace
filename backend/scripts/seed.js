import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "../src/config/db.js";
import User from "../src/models/User.js";
import Animal from "../src/models/Animal.js";
import Product from "../src/models/Product.js";

const animalSvg = (emoji, title) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="650"><rect width="100%" height="100%" rx="40" fill="#edf4ed"/><circle cx="450" cy="285" r="170" fill="#dce9dc"/><text x="450" y="350" text-anchor="middle" font-size="180">${emoji}</text><text x="450" y="545" text-anchor="middle" font-family="Arial" font-size="46" font-weight="700" fill="#173d2c">${title}</text></svg>`)}`;

const animals = [
  ["Cow","மாடு","Livestock","Bos taurus","🐄","Healthy cattle need clean water, balanced nutrition and hygienic housing.","15–20 years",["Grass","Hay","Balanced feed"],"Dry, clean, ventilated shelter",["Milk","Farm support"],["Mastitis","Foot-and-mouth disease"],["Follow local veterinary vaccination schedule"],["Clean water","Daily observation","Regular veterinary checkups"],true],
  ["Goat","ஆடு","Livestock","Capra hircus","🐐","Goats are hardy livestock that benefit from dry housing and varied forage.","10–15 years",["Grass","Leaves","Hay"],"Dry raised shelter with ventilation",["Milk","Meat"],["PPR","Foot-and-mouth disease"],["Follow local veterinary guidance"],["Hoof care","Clean water","Parasite prevention"],true],
  ["Sheep","செம்மறியாடு","Livestock","Ovis aries","🐑","Sheep require clean pasture, water, shelter and regular parasite control.","10–12 years",["Grass","Hay","Forage"],"Dry, ventilated shed",["Wool","Meat"],["Foot rot","Pneumonia"],["Follow veterinary vaccination plan"],["Shearing","Hoof checks","Clean bedding"],false],
  ["Buffalo","எருமை","Livestock","Bubalus bubalis","🐃","Buffaloes need water, shade, balanced feed and good hygiene.","18–25 years",["Grass","Fodder","Hay"],"Spacious shaded shelter",["Milk","Farm work"],["Mastitis","FMD"],["Veterinary vaccination schedule"],["Cooling","Clean water","Udder hygiene"],false],
  ["Horse","குதிரை","Domestic","Equus caballus","🐎","Horses need forage, exercise, safe fencing and routine hoof care.","25–30 years",["Hay","Grass","Concentrate"],"Safe ventilated stable with turnout",["Transport","Companion"],["Colic","Laminitis"],["Veterinary preventive care"],["Hoof trimming","Exercise","Dental checks"],false],
  ["Dog","நாய்","Pets","Canis lupus familiaris","🐕","Dogs need balanced nutrition, exercise, preventive care and social interaction.","10–13 years",["Complete dog food","Suitable treats"],"Clean safe indoor/outdoor space",["Companion","Security"],["Skin infections","Parasites"],["Core vaccines as advised by veterinarian"],["Exercise","Grooming","Fresh water"],true],
  ["Cat","பூனை","Pets","Felis catus","🐈","Cats benefit from species-appropriate food, enrichment and clean litter areas.","12–18 years",["Complete cat food","Fresh water"],"Safe indoor environment",["Companion","Pest control"],["Parasites","Dental disease"],["Routine vaccination by veterinarian"],["Litter hygiene","Play","Dental care"],true],
  ["Chicken","கோழி","Poultry","Gallus gallus domesticus","🐔","Backyard chickens need clean coops, balanced feed, water and protection.","5–10 years",["Poultry feed","Grains"],"Dry secure coop with ventilation",["Eggs","Meat"],["Respiratory disease","Parasites"],["Follow poultry vaccination plan"],["Clean coop","Fresh water","Predator protection"],false],
  ["Duck","வாத்து","Poultry","Anas platyrhynchos domesticus","🦆","Ducks need clean water access, suitable feed and dry resting areas.","5–10 years",["Poultry feed","Greens"],"Dry shelter with safe water access",["Eggs","Meat"],["Respiratory issues","Parasites"],["Local poultry vaccination guidance"],["Clean water","Dry bedding","Balanced feed"],false],
  ["Rabbit","முயல்","Pets","Oryctolagus cuniculus","🐇","Rabbits need high-fiber food, clean water and safe, spacious housing.","8–12 years",["Hay","Leafy greens","Pellets"],"Cool, clean, predator-safe enclosure",["Companion","Small-scale farming"],["GI stasis","Dental disease"],["Veterinary preventive care"],["Unlimited hay","Dental checks","Clean enclosure"],false]
].map(a => ({name:a[0],tamilName:a[1],category:a[2],scientificName:a[3],image:animalSvg(a[4],a[0]),shortDescription:a[5],description:a[5],lifespan:a[6],diet:a[7],housing:a[8],benefits:a[9],diseases:a[10],vaccination:a[11],care:a[12],featured:a[13]}));

const productSvg = (emoji, title) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="700" height="700"><rect width="100%" height="100%" rx="40" fill="#fff8ea"/><rect x="160" y="100" width="380" height="440" rx="28" fill="#173d2c"/><text x="350" y="330" text-anchor="middle" font-size="150">${emoji}</text><text x="350" y="610" text-anchor="middle" font-family="Arial" font-size="38" font-weight="700" fill="#173d2c">${title}</text></svg>`)}`;

const products = [
  ["Premium Cattle Feed","Animal Feed","Livestock","🐄","Balanced feed blend for dairy cattle.",850,10,25],
  ["Goat Nutrition Mix","Animal Feed","Livestock","🐐","Supplementary feed for healthy goats.",620,5,18],
  ["Poultry Layer Feed","Animal Feed","Poultry","🐔","Layer feed for backyard and small farm poultry.",540,0,30],
  ["Pet Grooming Kit","Care & Grooming","Pets","🐕","Brush, comb and basic grooming accessories.",799,10,12],
  ["Stainless Animal Bowl","Accessories","General","🥣","Easy-clean stainless steel feeding bowl.",299,0,42],
  ["Farm Water Trough","Farm Supplies","Livestock","💧","Durable water trough for domestic livestock.",1450,8,8],
  ["Hay Storage Bag","Farm Supplies","Livestock","🌾","Reusable bag for clean hay storage.",499,0,4],
  ["Pet Collar Set","Accessories","Pets","🦴","Adjustable collar and lead set.",449,12,0]
].map(p => ({name:p[0],category:p[1],animalCategory:p[2],image:productSvg(p[3],p[0].replace(/ /g," ")),description:p[4],price:p[5],discount:p[6],stock:p[7],rating:4.6,active:true}));

await connectDB();
const email = process.env.ADMIN_EMAIL || "admin@domesticcare.com";
const password = process.env.ADMIN_PASSWORD || "Admin@12345";
const passwordHash = await bcrypt.hash(password, 12);

await User.findOneAndUpdate({email}, {name:"Domestic Care Admin",email,passwordHash,role:"admin"}, {upsert:true,new:true});
await Animal.deleteMany({});
await Product.deleteMany({});
await Animal.insertMany(animals);
await Product.insertMany(products);
console.log(`Seeded admin: ${email}`);
console.log("Seeded animals:", animals.length, "products:", products.length);
process.exit(0);
