# TravelTrucks

`TravelTrucks` is a frontend web application for a camper rental service. The project is built with `Next.js` and `TypeScript` and allows users to browse the camper catalog, apply filters, open a camper details page, and read reviews.

## Main Features

- home page with a hero banner and a link to the catalog
- camper catalog with filtering by location, vehicle type, engine, and transmission
- pagination in `Load more` format
- camper details page
- image gallery built with `Swiper`
- reviews section with rating display
- booking form UI
- filled page `head` metadata for the main routes

## Technologies

- `Next.js`
- `TypeScript`
- `TanStack Query`
- `Axios`
- `Swiper`
- `React Icons`
- `CSS Modules`

## Pages

- `/` — home page
- `/catalog` — camper catalog
- `/catalog/[camperId]` — camper details page

## Installation

1. Clone the repository:

```bash
git clone <repository-link>
```

2. Go to the project folder:

```bash
cd travel_trucks
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file and add the following variable:

```env
NEXT_PUBLIC_API_URL=https://campers-api.goit.study
```

## Usage

Run the project locally:

```bash
npm run dev
```

Then open:

```bash
http://localhost:3000
```


## Notes

- the application uses the `https://campers-api.goit.study` backend
- reviews are loaded from the real endpoint `GET /campers/:camperId/reviews`
- the current backend does not provide a working booking submission endpoint, so the booking form is implemented on the UI side with graceful handling of this limitation

## Author

Olena Yarova
