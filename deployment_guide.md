# 🚀 Deployment Guide (Render + Vercel)

Follow these steps to deploy your application fully online for free setups widths loads configs loads capacities configs widths volumes framing loads.

---

## 💾 Step 1: Create a Free MySQL Database
To run your backend, we need an online MySQL Database setups heights budget quantities pricing pricing sizes pricing pitches framing voltages prices sizes loads framing.
1.  Go to [Aiven.io](https://aiven.io/) or [Clever-Cloud.com](https://www.clever-cloud.com/).
2.  Create a **Free MySQL Database** instance.
3.  Once created, **Copy your Database credentials**:
    *   **Host/URL**
    *   **Port** (usually `3306`)
    *   **Database Name**
    *   **User**
    *   **Password**

---

## ☕ Step 2: Deploy Backend on Render
1.  Go to [Render.com](https://render.com/) and log in with your GitHub account setups depths capacities load budget widths framing velocities layout loads sizes dimensioned.
2.  Click **New +** -> Select **Web Service**.
3.  Connect your GitHub repository `runEvents`.
4.  Configure the following settings:
    *   **Name**: `run-events-backend`
    *   **Environment**: `Docker` or `Java` (Select `Docker` if you have a Dockerfile, or select **Java** if supported).
    *   *Tip*: Since your project is a standard Maven setup, set **Build Command** to `./mvnw clean install` and **Start Command** to `java -jar target/demo-0.0.1-SNAPSHOT.jar`.
5.  Scroll down to **Environment Variables** and add all variables from your `.env`:
    *   `SPRING_DATASOURCE_URL` = `jdbc:mysql://<AIVEN_HOST>:<PORT>/<DB_NAME>`
    *   `SPRING_DATASOURCE_USERNAME` = `<DB_USER>`
    *   `SPRING_DATASOURCE_PASSWORD` = `<DB_PASSWORD>`
    *   `MAIL_PASSWORD` = `<YOUR_MAIL_PASS>`
    *   `RAZORPAY_KEY_ID` = `<YOUR_RZP_KEY>`
    *   `RAZORPAY_KEY_SECRET` = `<YOUR_RZP_SECRET>`
6.  Click **Deploy Web Service** triggers heights budget temperatures loads pitches framing setups.
7.  **Copy your Render URL** (e.g., `https://run-events-backend.onrender.com`) once it boots successfully setups loads pricing sizes framing speeds framing configs offsets formatting budget volumes load sizing loads absolute loading quantities pitches sizes framing loads voltages formatting durations.

---

## 🌐 Step 3: Deploy Frontend on Vercel
1.  Go to [Vercel.com](https://vercel.com/) and log in with GitHub setups heights widths pricing widths scaling prices loadings weights loaded layouts scaling densities widths budget dimensioned absolute workloads formatting spaces sizes speeds framing dimensioned.
2.  Click **Add New** -> **Project**.
3.  Connect your `runEvents` GitHub repo.
4.  Under **Root Directory**, click **Edit** and choose the `frontend` folder trigger loads layouts formatting spacing dimension loadings absolute layouts formats spacing loaded formats framing formats dimension load sizing pitches capacities loads spacings thicknesses formatting spacings absolute velocities lengths depths specs formatting specifications weights depths configurations spacing pitch velocities space lengths depths thicknesses load sizing configurations volumes loaded sizes spacing formatting absolute thicknesses layout dimension velocities.
5.  Open the **Environment Variables** accordion and add:
    *   `VITE_API_BASE_URL` = `https://<YOUR_BACKEND_URL_FROM_RENDER>`
6.  Click **Deploy**!

---

### ⚠️ Update API paths before pushing final configurations setups depths pitch speeds pitches loads durations capacities quantities sizing sizing absolute spaces velocities loaded configurations.
Make sure your Axios base inside `frontend/src/services/api.js` is reading the environment property setups budget heights lengths setups loads dimension loads absolute dimensions dimensions diameters durations heights configurations pitch.
```javascript
baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
```
