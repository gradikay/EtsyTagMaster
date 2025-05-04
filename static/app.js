// DOM Elements
const form = document.getElementById('tag-form');
const descriptionInput = document.getElementById('description');
const categorySelect = document.getElementById('category');
const styleInput = document.getElementById('style');
const maxTagsSlider = document.getElementById('maxTags');
const maxTagsValue = document.getElementById('maxTagsValue');
const maxWordsSlider = document.getElementById('maxWordsPerTag');
const maxWordsValue = document.getElementById('maxWordsValue');
const resultsSection = document.getElementById('results-section');
const tagsContainer = document.getElementById('tags-container');
const tagsCountElement = document.getElementById('tags-count');
const relevanceScoreElement = document.getElementById('relevance-score');
const copyAllBtn = document.getElementById('copy-all-btn');
const copyLinkBtn = document.getElementById('copy-link-btn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const themeToggle = document.getElementById('theme-toggle');

// Hexagons animation setup
function createHexagons() {
  const hexContainer = document.createElement('div');
  hexContainer.className = 'animated-hexagons';
  
  // Create 20 animated hexagons
  for (let i = 0; i < 20; i++) {
    const hexagon = document.createElement('div');
    
    // Random starting positions
    hexagon.style.left = `${Math.random() * 100}%`;
    hexagon.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay
    hexagon.style.animationDelay = `${Math.random() * 5}s`;
    
    hexContainer.appendChild(hexagon);
  }
  
  // Add to the background
  const backgroundEl = document.querySelector('.animated-background');
  if (backgroundEl) {
    backgroundEl.appendChild(hexContainer);
  }
}

// Theme toggle
function initThemeToggle() {
  // Check for saved theme preference or use default
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.querySelector('.stars')?.classList.add('hidden');
    const lightAnim = document.createElement('div');
    lightAnim.className = 'light-anim';
    document.querySelector('.animated-background')?.appendChild(lightAnim);
    themeToggle.checked = false;
  }

  // Theme toggle event listener
  themeToggle.addEventListener('change', function() {
    if (this.checked) {
      // Dark mode
      document.body.classList.remove('light-mode');
      document.querySelector('.light-anim')?.remove();
      document.querySelector('.stars')?.classList.remove('hidden');
      localStorage.setItem('theme', 'dark');
    } else {
      // Light mode
      document.body.classList.add('light-mode');
      document.querySelector('.stars')?.classList.add('hidden');
      if (!document.querySelector('.light-anim')) {
        const lightAnim = document.createElement('div');
        lightAnim.className = 'light-anim';
        document.querySelector('.animated-background')?.appendChild(lightAnim);
      }
      localStorage.setItem('theme', 'light');
    }
  });
}

// Slider value display
function initSliders() {
  maxTagsSlider.addEventListener('input', () => {
    maxTagsValue.textContent = maxTagsSlider.value;
  });
  
  maxWordsSlider.addEventListener('input', () => {
    maxWordsValue.textContent = maxWordsSlider.value;
  });
}

// Tag Generation Logic
function generateTags(description, category, style, maxTags, maxWordsPerTag) {
  if (!description || description.trim() === '') {
    return [];
  }
  
  // Clean and prepare the text
  let text = description.toLowerCase();
  
  // Remove special characters but preserve spaces
  text = text.replace(/[^\w\s]/g, ' ');
  
  // Split into words and filter out very common words
  const commonWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'for', 'nor', 'on', 'at', 'to', 'by', 
    'of', 'in', 'with', 'as', 'from', 'about', 'is', 'are', 'was', 'were', 'be', 
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'shall', 
    'should', 'would', 'may', 'might', 'must', 'can', 'could', 'i', 'you', 'he', 
    'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'this', 'that', 
    'these', 'those', 'am', 'is', 'are', 'very', 'also', 'just', 'only'
  ]);
  
  const words = text.split(/\s+/)
    .filter(word => word.length > 2) // Filter out short words
    .filter(word => !commonWords.has(word)); // Filter out common words
  
  // Get unique words
  const uniqueWords = Array.from(new Set(words));
  
  // Create single-word tags
  let singleWordTags = uniqueWords.map(word => ({
    text: word,
    weight: countWordFrequency(word, words)
  }));
  
  // Sort by weight (frequency)
  singleWordTags.sort((a, b) => b.weight - a.weight);
  
  // Keep only the most frequent ones
  singleWordTags = singleWordTags.slice(0, Math.min(singleWordTags.length, 100));
  
  // Create multi-word tags
  const multiWordTags = [];
  
  // Create 2 and 3-word combinations from the most frequent words
  for (let i = 0; i < Math.min(singleWordTags.length, 30); i++) {
    for (let j = i + 1; j < Math.min(singleWordTags.length, 30); j++) {
      const tag = `${singleWordTags[i].text} ${singleWordTags[j].text}`;
      
      // Calculate combined weight
      const weight = (singleWordTags[i].weight + singleWordTags[j].weight) / 2;
      
      // Higher weight if these words appear near each other in the description
      if (areWordsNearby(description, singleWordTags[i].text, singleWordTags[j].text, 5)) {
        multiWordTags.push({
          text: tag,
          weight: weight * 1.5
        });
      } else {
        multiWordTags.push({
          text: tag,
          weight
        });
      }
      
      // Create 3-word tags if needed
      if (maxWordsPerTag >= 3) {
        for (let k = j + 1; k < Math.min(singleWordTags.length, 30); k++) {
          const tag3 = `${singleWordTags[i].text} ${singleWordTags[j].text} ${singleWordTags[k].text}`;
          
          // Calculate combined weight
          const weight3 = (singleWordTags[i].weight + singleWordTags[j].weight + singleWordTags[k].weight) / 3;
          
          multiWordTags.push({
            text: tag3,
            weight: weight3
          });
        }
      }
    }
  }
  
  // Add category and style if provided
  if (category && category !== '') {
    singleWordTags.push({
      text: category,
      weight: 10 // Higher weight for category
    });
  }
  
  if (style && style !== '') {
    singleWordTags.push({
      text: style,
      weight: 9 // Higher weight for style
    });
    
    // Also create combinations with style
    for (let i = 0; i < Math.min(singleWordTags.length, 10); i++) {
      const styleTag = `${style} ${singleWordTags[i].text}`;
      multiWordTags.push({
        text: styleTag,
        weight: 8
      });
    }
  }
  
  // Combine and sort all tags
  let allTags = [...singleWordTags, ...multiWordTags];
  
  // Filter tags by maximum words
  allTags = allTags.filter(tag => {
    const wordCount = tag.text.split(/\s+/).length;
    return wordCount <= maxWordsPerTag;
  });
  
  // Sort by weight
  allTags.sort((a, b) => b.weight - a.weight);
  
  // Remove duplicates and similar tags
  const filteredTags = [];
  const tagTexts = new Set();
  
  for (const tag of allTags) {
    const normalizedTag = tag.text.trim().toLowerCase();
    if (!tagTexts.has(normalizedTag)) {
      // Check if this tag is not too similar to existing tags
      const isTooSimilar = filteredTags.some(existingTag => {
        return areSimilarTags(normalizedTag, existingTag.text);
      });
      
      if (!isTooSimilar) {
        filteredTags.push({
          text: normalizedTag,
          weight: tag.weight
        });
        tagTexts.add(normalizedTag);
      }
    }
  }
  
  // Limit to maximum number of tags
  return filteredTags.slice(0, maxTags).map(tag => ({
    text: tag.text,
    score: 99 // Maximum relevance score
  }));
}

// Helper function to count word frequency
function countWordFrequency(word, wordArray) {
  return wordArray.filter(w => w === word).length;
}

// Helper function to check if words appear near each other
function areWordsNearby(text, word1, word2, maxDistance) {
  const words = text.toLowerCase().split(/\s+/);
  
  for (let i = 0; i < words.length; i++) {
    if (words[i].includes(word1)) {
      // Check if word2 is within maxDistance words
      for (let j = Math.max(0, i - maxDistance); j <= Math.min(words.length - 1, i + maxDistance); j++) {
        if (i !== j && words[j].includes(word2)) {
          return true;
        }
      }
    }
  }
  
  return false;
}

// Helper function to check if tags are similar
function areSimilarTags(tag1, tag2) {
  // Check if one tag is contained within the other
  if (tag1.includes(tag2) || tag2.includes(tag1)) {
    return true;
  }
  
  // Check if they share most words
  const words1 = tag1.split(/\s+/);
  const words2 = tag2.split(/\s+/);
  
  let sharedWords = 0;
  for (const word of words1) {
    if (words2.includes(word)) {
      sharedWords++;
    }
  }
  
  // If they share more than 70% of words, consider them similar
  const similarityThreshold = 0.7;
  return (sharedWords / Math.max(words1.length, words2.length)) > similarityThreshold;
}

// Form submit handler
function handleFormSubmit(e) {
  e.preventDefault();
  
  const description = descriptionInput.value;
  const category = categorySelect.value;
  const style = styleInput.value;
  const maxTags = parseInt(maxTagsSlider.value, 10);
  const maxWordsPerTag = parseInt(maxWordsSlider.value, 10);
  
  if (!description || description.trim() === '') {
    showToast('Please enter a product description', false);
    return;
  }
  
  // Generate tags
  const tags = generateTags(description, category, style, maxTags, maxWordsPerTag);
  
  // Display results
  displayTags(tags);
  
  // Show results section
  resultsSection.classList.remove('hidden');
  
  // If we're below the results section, scroll to it
  const resultsSectionTop = resultsSection.getBoundingClientRect().top;
  if (resultsSectionTop > window.innerHeight) {
    resultsSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Display generated tags
function displayTags(tags) {
  // Clear existing tags
  tagsContainer.innerHTML = '';
  
  // Update tags count
  tagsCountElement.textContent = `Generated Tags (${tags.length})`;
  
  // Display each tag
  tags.forEach(tag => {
    const tagElement = document.createElement('span');
    tagElement.className = 'copy-tag-badge';
    tagElement.textContent = tag.text;
    tagElement.dataset.tag = tag.text;
    
    // Click to copy
    tagElement.addEventListener('click', () => {
      copyToClipboard(tag.text);
      tagElement.classList.add('copied');
      setTimeout(() => {
        tagElement.classList.remove('copied');
      }, 1500);
      showToast(`Copied: ${tag.text}`);
    });
    
    tagsContainer.appendChild(tagElement);
  });
  
  // Set relevance score
  relevanceScoreElement.textContent = '99/99';
}

// Copy all tags
function handleCopyAll() {
  const tags = Array.from(tagsContainer.children).map(tag => tag.dataset.tag);
  if (tags.length === 0) return;
  
  copyToClipboard(tags.join(', '));
  showToast('All tags copied to clipboard');
}

// Generate shareable link
function handleCopyLink() {
  const description = encodeURIComponent(descriptionInput.value);
  const category = encodeURIComponent(categorySelect.value);
  const style = encodeURIComponent(styleInput.value);
  const maxTags = maxTagsSlider.value;
  const maxWordsPerTag = maxWordsSlider.value;
  
  const url = new URL(window.location.href);
  url.search = new URLSearchParams({
    description,
    category,
    style,
    maxTags,
    maxWordsPerTag
  }).toString();
  
  copyToClipboard(url.toString());
  showToast('Shareable link copied to clipboard');
}

// Helper function to copy text to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textarea);
  });
}

// Show toast notification
function showToast(message, success = true) {
  toastMessage.textContent = message;
  
  if (!success) {
    toast.style.backgroundColor = 'rgba(239, 68, 68, 0.9)';
  } else {
    toast.style.backgroundColor = 'rgba(16, 185, 129, 0.9)';
  }
  
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Check for URL parameters
function checkUrlParams() {
  const params = new URLSearchParams(window.location.search);
  
  if (params.has('description')) {
    descriptionInput.value = params.get('description');
    
    if (params.has('category')) {
      categorySelect.value = params.get('category');
    }
    
    if (params.has('style')) {
      styleInput.value = params.get('style');
    }
    
    if (params.has('maxTags')) {
      const maxTags = parseInt(params.get('maxTags'), 10);
      maxTagsSlider.value = maxTags;
      maxTagsValue.textContent = maxTags;
    }
    
    if (params.has('maxWordsPerTag')) {
      const maxWords = parseInt(params.get('maxWordsPerTag'), 10);
      maxWordsSlider.value = maxWords;
      maxWordsValue.textContent = maxWords;
    }
    
    // Auto-generate tags if description is provided via URL
    if (descriptionInput.value.trim() !== '') {
      handleFormSubmit(new Event('submit'));
    }
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  createHexagons();
  initThemeToggle();
  initSliders();
  
  // Event listeners
  form.addEventListener('submit', handleFormSubmit);
  copyAllBtn.addEventListener('click', handleCopyAll);
  copyLinkBtn.addEventListener('click', handleCopyLink);
  
  // Check for URL parameters
  checkUrlParams();
});