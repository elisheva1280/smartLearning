# smartLearning

## התקנה

1. שכפל את הפרויקט:
```bash
git clone <repository-url>
cd miniMVPproject
```

2. התקן תלויות השרת:
```bash
cd server
npm install
```

3. התקן תלויות הלקוח:
```bash
cd ../client
npm install
```

4. הגדר משתני סביבה:
```bash
cd ../server
cp .env.example .env
```

5. ערוך את קובץ `.env` והוסף את המפתחות שלך:
- `OPENAI_API_KEY` - מפתח API של OpenAI
- `MONGODB_URI` - כתובת MongoDB

6. הפעל את השרת:
```bash
npm start
```

7. הפעל את הלקוח (בטרמינל נפרד):
```bash
cd ../client
npm start
```  
