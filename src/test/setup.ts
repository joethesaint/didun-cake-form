import '@testing-library/jest-dom';
// jsdom has no scrolling; the app calls scrollTo when it changes page.
window.scrollTo = () => {};
