import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import $ from 'jquery';

const setHeights = () => {
  const totalHeight = $(window).height();
  const headerHeight = $('.header').outerHeight();
  const footerHeight = $('.current-track').outerHeight();
  const playlistHeight = $('.playlist').outerHeight();
  const nowPlaying = $('.playing').outerHeight();

  const navHeight = totalHeight - (headerHeight + footerHeight + playlistHeight + nowPlaying);
  const artistHeight = totalHeight - (headerHeight + footerHeight);

  $(".navigation").css("height", navHeight);
  $(".artist").css("height", artistHeight);
  $(".social").css("height", artistHeight);
};

const handleResize = () => {
  if ($(window).width() <= 768) {
    $(".collapse").removeClass("in");
    $(".navigation").css("height", "auto");
    $(".artist").css("height", "auto");
  } else {
    $(".collapse").addClass("in");
  }
};

const setupEventListeners = () => {
  $(window).on("resize load", () => {
    setHeights();
    handleResize();
  });

  $(".navigation__list__header").on("click", function () {
    $(this).toggleClass("active");
  });
};

const handleDocumentReady = () => {
  setHeights();
  handleResize();
  setupEventListeners();
};

const Root = () => {
  useEffect(() => {
    $(document).ready(handleDocumentReady);
  }, []);

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
