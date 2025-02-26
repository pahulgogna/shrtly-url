import fs from 'fs/promises';
import 'dotenv/config';

const filePath = './index.html';
const placeholder = '%REACT_APP_ADSENSE_CLIENT%';
const replacement = process.env.VITE_GOOGLE_ADSENSE_ID;
const AdsFileData = process.env.VITE_GOOGLE_ADS_FILE;

async function replacePlaceholder() {
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const updatedContent = fileContent.replace(new RegExp(placeholder, 'g'), replacement);
    await fs.writeFile(filePath, updatedContent, 'utf8');
    console.log('Replacement completed successfully.');
  } catch (error) {
    console.error('Error during replacement:', error);
  }
}

async function addAdsFile() {
  
  try{
    await fs.writeFile("./public/Ads.txt", AdsFileData, 'utf8');
    console.log("Created Ads.txt")
  }
  catch (error) {
    console.error('Error during replacement:', error);
  }
  
}

replacePlaceholder();
addAdsFile()