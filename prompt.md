# Prompts and Outcomes

## Prompt
“I want to use Tailwind CSS in this Next.js app. Can you walk me through the steps to add Tailwind, set up the config files, and wire it into the project?”

Outcome: Installed tailwindcss, postcss, and autoprefixer. Created tailwind.config.js with content paths pointing to ./pages/**/* and ./components/**/*. Added postcss.config.js with Tailwind and Autoprefixer plugins. Updated styles/globals.css to include @tailwind base;, @tailwind components;, and @tailwind utilities; plus light global styles for typography and background.



## Prompt
“Make a simple navigation component for the app with semantic HTML? It should have links for Home/Postcards, Map, and Add Postcard, and highlight the active page.”

Outcome: Created components/MainNav.tsx using semantic <nav> with aria-label="Primary". Added <Link> components for “Postcards”, “Map”, and “Add Postcard”. Used useRouter() to detect the active route and apply different Tailwind classes for active vs inactive states. All interactive elements are keyboard-focusable and use proper focus-visible styles.



## Prompt
“Can you define a TypeScript type for a postcard object that we’ll use across the app? It should include id, title, location, coordinates, image URL, description, and date added.”

Outcome: Created types/postcard.ts exporting a Postcard type with the following fields:
id, title, location, lat, lng, imageUrl, description, and dateAdded (ISO string). This centralizes the data shape for postcards so future hooks and components can share a consistent type.



## Prompt
“I want a generic React hook called useLocalStorage that works with TypeScript. It should load an initial value from localStorage, fall back to a default, be safe with SSR, and automatically sync changes back to localStorage. Walk me through the steps for that.”

Outcome: Created hooks/useLocalStorage.ts implementing useLocalStorage<T>(key: string, defaultValue: T). The hook: On mount, checks typeof window !== "undefined" for SSR safety. Attempts to read and parse the stored JSON for the given key. Falls back to the provided defaultValue if nothing is stored or parsing fails. Persists any subsequent value changes back to localStorage. It returns [value, setValue] as a typed tuple.
## Prompt
“Walk me through the creation of a usePostcards hook that uses useLocalStorage under the hood? It should manage an array of Postcardobjects and provide helpers like add, update, delete, and get by id. Also add a couple of sample postcards as seed data.”

Outcome: Created hooks/usePostcards.ts that: Uses useLocalStorage<Postcard[]>(POSTCARDS_KEY, SEED_POSTCARDS) to store postcards in localStorage. Provides memoized callbacks addPostcard, updatePostcard, deletePostcard, and getPostcardById. Includes a small SEED_POSTCARDS array with two example postcards (Chicago and London) with lat/lng initially set to null, ready for map integration later.



## Prompt 
"can you make a layout component with the navigation at the top? it should have links for Postcards and Map"

Outcome: Created `components/Layout.tsx` with semantic `<header>`, `<nav>`, and `<main>` tags. Navigation includes "Postcards" and "Map" links with active state styling. Updated `_app.tsx` to wrap all pages with the Layout.



## Prompt 
"i need a card component that shows a postcard - like the image, title, location, and date. and when you click it, it should go to the detail page"

Outcome: Created `components/PostcardCard.tsx` that displays postcard image, title, location, and formatted date. Card is clickable and navigates to `/post/[id]`.



## Prompt 
"can you make the home page show all my postcards? like in a grid layout"

Outcome:  Updated `pages/index.tsx` to use `usePostcards()` hook and render all postcards in a responsive grid using `<ul><li>`. Added "Your Postcard Collection" heading and empty state message.



## Prompt 
"i need a form to add postcards. it should have fields for title, location, image url, and description. and show a preview of the image when they paste a url"

Outcome: Created `components/PostcardForm.tsx` with all required fields, proper labels for accessibility, and optional image preview that appears when Image URL is filled.


## Prompt 
"make the add page work - when they submit the form, it should save the postcard and redirect to home"

Outcome: Updated `pages/add.tsx` to use PostcardForm. On submit, generates unique ID, sets dateAdded, sets lat/lng to null, calls addPostcard, and redirects to home page.



## Prompt 
"on the detail page, show the postcard info and add a delete button. also a back button to go home"

Outcome: Updated `pages/post/[id].tsx` to display postcard in semantic `<article>` with `<figure>` for image and `<dl>` for details. Added "Back to Home" and "Delete" buttons. Delete calls deletePostcard and redirects to home.



## Prompt 
"wait the london image isn't showing up"

Outcome: Fixed broken London image URL in seed data - replaced with working Unsplash URL.


## Prompt 
"the chicago image is wrong, it's showing mountains but chicago is flat"

Outcome: Updated Chicago image URL to show actual Chicago city skyline instead of nature scene.



## Prompt 
"i can't add postcards, there's no button to get to the add page"

Outcome:  Added "Add Postcard" link to Layout navigation so users can access the add page.



## Prompt 
"is the map page supposed to have its own navigation? it's showing nav twice"

Outcome:  Removed MainNav import and usage from `pages/map.tsx` since Layout already provides navigation. Also removed duplicate `<main>` tag.


## Prompt 
"I need to refactor the postcard collection UI to use a sidebar navigation layout. The main content area should display two separate horizontal-scrolling sections: 'Current Collection' (visited postcards with dates) and 'Future Collection' (bucketlist items without dates). Postcards should be categorized by a category field ('visited' or 'bucketlist'), and the seed data should include this field. Update the Layout component to include a left sidebar with icon-based navigation, and modify the home page to render the two collection sections with horizontal scrolling. Ensure the postcard cards are sized consistently for the horizontal layout.
Outcomes:
- Sidebar navigation with icons implemented
- Two collection sections (Current/Future) with horizontal scrolling
- Postcard type extended with category field
- Seed data updated with 9 postcards (3 visited, 6 bucketlist)
- Postcard cards redesigned for horizontal layout with proper date formatting
Issues Fixed:
- Migration logic was re-adding deleted seed postcards — fixed by tracking migration completion in localStorage and preventing re-runs
- Add postcard wasn't persisting — fixed by ensuring localStorage sync before navigation
- Back button navigation wasn't working — switched from Link to button with router.push and error handling
- Las Vegas image URL was incorrect — updated to a working Unsplash URL
- useLocalStorage hook was reloading on remount and overwriting deletes — fixed by only loading on initial mount with a ref flag
## Prompt 
"Implement a dark mode toggle that persists user preference in localStorage and applies dark mode classes across all components. The toggle should be in the top-right header, and all UI elements (sidebar, cards, forms, buttons) need dark mode variants. Use Tailwind's class-based dark mode strategy, and ensure the theme preference loads correctly on initial render to avoid flash.
Outcomes:
- Dark mode toggle button in header (switches between "Dark"/"Light" text)
- Preference persisted in localStorage
- Dark mode classes added to all components (Layout, PostcardCard, forms, buttons, navigation)
- Tailwind config updated with darkMode: 'class'
- Theme loads on mount without flash



Adriana prompts:

Asked an llm to create detailed steps and sections based on our project description.

This was my section:
## Prompt
“I’m working on a web app in the following sections (insert sections 1 and 2). Next is:
Section 3 – Map View & Geocoding (Owner: Adriana)
Goal: Implement the map page using Leaflet/React-Leaflet + Nominatim geocoding and connect it to postcards.
Steps
Set up Leaflet / React-Leaflet
Install:
leaflet
react-leaflet
Handle Next.js SSR:
Create components/PostcardMap.tsx with dynamic import if needed, or only render map on client (typeof window !== 'undefined').
Commit chore: install and configure Leaflet / React-Leaflet.


Map component
PostcardMap props: postcards: Postcard[].

Internally:
<MapContainer> centered at a default (e.g., [20, 0]) with reasonable zoom.
<TileLayer> using OpenStreetMap tiles.

For each postcard with lat and lng:
<Marker> at [lat, lng].
<Popup> showing small image, title, location, plus a “View” button linking to /post/[id].

Commit feat: add PostcardMap component with markers.


Map page (/map)
Use usePostcards() to get all postcards.
For now, pass all with valid lat/lng to PostcardMap.
Add basic layout:

Heading “Map View”.
Map filling the rest of the screen.
Commit feat: implement basic map page.


Geocode helper
Create utils/geocode.ts:
geocodeLocation(location: string): Promise<{ lat: number; lng: number } | null>.

Logic:
Check geocodeCache in localStorage:
If location exists, return cached value.
Otherwise:
Call Nominatim API with a fetch.
Parse first result’s lat/lon.
Save to geocodeCache.


Commit feat: add Nominatim geocoding helper with cache.
Integrate geocoding into Add postcard flow
In pages/add.tsx:
On submit:
Call geocodeLocation(locationString).
If result not null:
Save lat/lng on postcard.
Else:
Save postcard with lat/lng = null and show a warning (e.g., toast or inline text “Could not locate this address on map”).
After save, redirect to /map (to match your design).
Commit feat: geocode locations when adding postcards.
Map search/filter
In pages/map.tsx:
Add search state: query.
Text input to filter:
filteredPostcards = postcards.filter where title or location match query (case-insensitive).
Pass filteredPostcards into PostcardMap.
Optional: Add a small list of filtered postcards under/next to the map.
Commit feat: add search and filter to map page.
Deliverables
✅ Map page with markers for postcards that have coordinates.
✅ Nominatim geocoding with caching in localStorage.
✅ Add flow that automatically geocodes new postcards.
✅ Searchable map view.
After Section 3: The “big feature” (map) works and is tied to your existing postcard data. P4 can now focus on making it polished, accessible, and well-documented.


sections 1 and 2 have already been completed and as the web app stands there is currently an existing tab for the map but it has not been implemented, this is our current task to implement the map. lets do it in the steps outlined so i can push the different commits to git as we work on completing section 3.”

Outcome: 
Since this llm has access to command line it started committing to git without me even checking if they were working and of course it wasn’t. The changes made broke the saving of new postcards. Debugged then thought of new small changes to be made and started doing my own commits instead of letting AI do its own commits.



## Prompts
“maybe when we add a post card, the location search should be like a search bar from leaflet so that it automatically gets an address.”


“can we make the the little tabs on the map with the post card where it says "view details" with the link to the postcard, can we change it to not have a blue box but rather just the view details link in a new line text. also can we add a new field in the add postcard to choose a date, if no date is chosen default to current date. also can we make the description in the add postcard to be optional. can you also make the map be rectangular a little wider on the right hand side to fill a wider screen, but obviously make it adjustable to different screen sizes”

“can we add an order by option to order by name A to Z, Z to A, by date most recent or first”

“should we add an option to upload image from computer or insert url so the user has both options”

“can we also add the option to edit a postcard when you are like inside of the postcard, like next to the delete button add an edit button in grey. Make sure the geocoded location stays saved if it isn’t edited”

Outcome:
- Postcards can be edited and deleted
- Allow upload image or image url
- Sorting A - Z, Z - A, by date
- View details of postcards

