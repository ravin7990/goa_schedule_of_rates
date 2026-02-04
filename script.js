// Sample data - replace with your actual documents
const documents = [
    { year: '2023', category: 'civil', title: 'Goa SOR Civil Works 2023', type: 'PDF', size: '4.2 MB', link: 'docs/2023_civil.pdf' },
    { year: '2023', category: 'electrical', title: 'Goa SOR Electrical Works 2023', type: 'PDF', size: '3.8 MB', link: 'docs/2023_electrical.pdf' },
    { year: '2023', category: 'sewage', title: 'Goa SOR Sewage Works 2023', type: 'PDF', size: '2.9 MB', link: 'docs/2023_sewage.pdf' },
    { year: '2022', category: 'civil', title: 'Goa SOR Civil Works 2022', type: 'PDF', size: '4.0 MB', link: 'docs/2022_civil.pdf' },
    { year: '2022', category: 'electrical', title: 'Goa SOR Electrical Works 2022', type: 'PDF', size: '3.6 MB', link: 'docs/2022_electrical.pdf' },
    { year: '2021', category: 'civil', title: 'Goa SOR Civil Works 2021', type: 'PDF', size: '3.9 MB', link: 'docs/2021_civil.pdf' },
    { year: '2025', category: 'civil', title: 'Goa SOR Civil Works 2025', type: 'PDF', size: '3.9 MB', link: '' },
    { year: '2014', category: 'civil', title: 'Goa SOR Civil Works 2014', type: 'xls', size: '3.9 MB', link: 'docs/gsr_2014_road_gst.xls' },
    { year: '2015', category: 'civil', title: 'Goa SOR Civil Works 2015', type: 'docx', size: '3.9 MB', link: 'docs/gsr_2015_building.docx' },
    { year: '2015', category: 'civil', title: 'Goa SOR Civil Works Detail 2015', type: 'rar', size: '3.9 MB', link: 'docs/gsr_2015_building_detail.rar' },
    { year: '2025', category: 'civil', title: 'Goa SOR Civil Works Detail 2025', type: 'rar', size: '3.9 MB', link: 'docs/' },
    { year: '2016', category: 'Fire', title: 'Part 4 Fire And Safety', type: 'PDF', size: '88 MB', link: 'https://mptownplan.gov.in/act%20&%20Rules/NationalBuilding%20Code%20Part-IV%20(Fire%20Safety).pdf' }
];

// Create modal element
const modalHTML = `
<div id="gsr2025-modal" class="modal" style="display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5);">
    <div class="modal-content" style="background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 80%; max-width: 500px; border-radius: 5px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
        <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">
            <h3 style="margin: 0; color: #d9534f;">Important Notice</h3>
            <span class="close-modal" style="font-size: 24px; font-weight: bold; cursor: pointer; color: #aaa;">&times;</span>
        </div>
        <div class="modal-body">
            <p style="margin: 0 0 15px 0; line-height: 1.5;">
                As per latest information available, GSR 2025 is still not released by PWD.
            </p>
            <p style="margin: 0; line-height: 1.5;">
                As soon as it is available, it will be ready to download on our website.
            </p>
            <p style="margin: 15px 0 0 0; font-weight: bold; color: #333;">
                Thanking you.
            </p>
        </div>
        <div class="modal-footer" style="border-top: 1px solid #ddd; padding-top: 15px; margin-top: 20px; text-align: right;">
            <button id="modal-ok-btn" style="background-color: #337ab7; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">OK</button>
        </div>
    </div>
</div>
`;

// Add modal to the document
document.addEventListener('DOMContentLoaded', function() {
    // Add modal HTML to the document
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const searchInput = document.getElementById('search-input');
    const yearSelect = document.getElementById('year-select');
    const categorySelect = document.getElementById('category-select');
    const resetBtn = document.getElementById('reset-btn');
    const resultsTable = document.getElementById('results-table');
    const resultCount = document.getElementById('result-count');
    
    const modal = document.getElementById('gsr2025-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalOkBtn = document.getElementById('modal-ok-btn');

    // Modal close functionality
    function closeModalFunc() {
        modal.style.display = 'none';
    }

    closeModal.addEventListener('click', closeModalFunc);
    modalOkBtn.addEventListener('click', closeModalFunc);
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });

    // Initial load - show all documents
    filterAndDisplayDocuments();

    // Event listeners for filtering
    searchInput.addEventListener('input', filterAndDisplayDocuments);
    yearSelect.addEventListener('change', filterAndDisplayDocuments);
    categorySelect.addEventListener('change', filterAndDisplayDocuments);
    resetBtn.addEventListener('click', resetFilters);

    function filterAndDisplayDocuments() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedYear = yearSelect.value;
        const selectedCategory = categorySelect.value;

        const filteredDocs = documents.filter(doc => {
            const matchesSearch = doc.title.toLowerCase().includes(searchTerm) || 
                                doc.category.toLowerCase().includes(searchTerm) ||
                                doc.year.includes(searchTerm);
            const matchesYear = selectedYear === 'all' || doc.year === selectedYear;
            const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
            
            return matchesSearch && matchesYear && matchesCategory;
        });

        displayDocuments(filteredDocs, searchTerm);
    }

    function displayDocuments(docs, searchTerm = '') {
        resultsTable.innerHTML = '';
        
        if (docs.length === 0) {
            resultsTable.innerHTML = '<tr><td colspan="6" class="text-center">No documents found matching your criteria.</td></tr>';
            resultCount.textContent = '0';
            return;
        }

        docs.forEach(doc => {
            const row = document.createElement('tr');
            
            // Highlight search term in title
            let displayTitle = doc.title;
            if (searchTerm) {
                const regex = new RegExp(searchTerm, 'gi');
                displayTitle = doc.title.replace(regex, match => 
                    `<span class="highlight">${match}</span>`);
            }
            
            // Create download link
            let downloadLink = '';
            if (doc.link && !doc.link.endsWith('/')) {
                // Check if it's a GSR 2025 document
                if (doc.year === '2025' && doc.category === 'civil') {
                    downloadLink = `<a href="#" class="download-btn gsr2025-btn" data-title="${doc.title}">Download</a>`;
                } else {
                    downloadLink = `<a href="${doc.link}" class="download-btn" download>Download</a>`;
                }
            } else {
                // For empty links or directory links, show disabled button
                downloadLink = `<span class="download-btn disabled" style="opacity: 0.5; cursor: not-allowed;">Download</span>`;
                
                // For GSR 2025 with empty/partial links, make it clickable for modal
                if (doc.year === '2025' && doc.category === 'civil') {
                    downloadLink = `<a href="#" class="download-btn gsr2025-btn" data-title="${doc.title}">Download</a>`;
                }
            }
            
            row.innerHTML = `
                <td>${doc.year}</td>
                <td>${doc.category.charAt(0).toUpperCase() + doc.category.slice(1)}</td>
                <td>${displayTitle}</td>
                <td>${doc.type}</td>
                <td>${doc.size}</td>
                <td>${downloadLink}</td>
            `;
            
            resultsTable.appendChild(row);
        });

        // Add event listeners to GSR 2025 download buttons
        document.querySelectorAll('.gsr2025-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                modal.style.display = 'block';
            });
        });

        resultCount.textContent = docs.length;
    }

    function resetFilters() {
        searchInput.value = '';
        yearSelect.value = 'all';
        categorySelect.value = 'all';
        filterAndDisplayDocuments();
    }
});
