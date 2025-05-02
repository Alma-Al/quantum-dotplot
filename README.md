# Quantum-dotplot Scrolling Website
An interactive single‑page React/Vite application that showcases quantum processors through a sticky D3 dot plot and scroll‑triggered storytelling using ScrollMagic.
---
## Technologies Used

- **Framework**  
  - [React](https://reactjs.org/) (with TypeScript)  
  - [Vite](https://vitejs.dev/) for fast development and bundling  

- **Data Visualization**  
  - [D3.js](https://d3js.org/) for making the dotplot  
  - [ScrollMagic](http://scrollmagic.io/) for scroll‑based triggers  
---
## Instructions to Run Locally
1. **Clone the repo**  
   ```bash
   git clone https://github.com/Alma-Al/quantum-dotplot.git
   cd quantum-dotplot

2. **Install dependencies**  
   ```bash
   npm install

3. **Show website**
   ```bash
   npm run dev
---
## Design and Implementation Notes
- **Layout**  
  - Intro text with an illustration appear first  
  - Empty dotplot that slowly reveals more information about superconducting and trapped-ion qubits as you scroll

- **Dotplot**
  - log-scale axes with custome ticks and superscripts for the exponents
  - Superconducting qubits as blue squared and trapped ion qubits as circles
  - Increasing size of the trapped ion qubits correlates to denser connectivity
  - Hovering over the plot points show the year

- **Styling & Accessibility**  
  - Simple, sleek interface so that the data visualization is front and center
  - Minimal, high-contrast color scheme to maximize legibility
  - Additionally, coloring and shapes are both used to ensure that information is not conveyed by color alone 
  - We use relative font‑sizes and generous spacing so text remains readable at all viewport widths.
  - Scroll triggers and  floating boxes are operable via keyboard (with visible focus outlines).