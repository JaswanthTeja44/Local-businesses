        let businesses = [
            {
                id: 1,
                name: "Joe's Diner",
                rating: 4.2,
                reviews: [
                    { user: "Alice", rating: 4, comment: "Great burgers!" },
                    { user: "Bob", rating: 5, comment: "Excellent service" }
                ]
            },
            {
                id: 2,
                name: "City Coffee",
                rating: 3.8,
                reviews: [
                    { user: "Charlie", rating: 3, comment: "Good coffee but slow service" }
                ]
            }
        ];

        // Render businesses
        function renderBusinesses() {
            const businessList = document.getElementById('businessList');
            businessList.innerHTML = '';
            
            businesses.forEach(business => {
                const card = document.createElement('div');
                card.className = 'business-card';
                card.innerHTML = `
                    <h3>${business.name}</h3>
                    <div class="rating">
                        ${'★'.repeat(Math.floor(business.rating))}${business.rating % 1 ? '½' : ''}
                        (${business.rating.toFixed(1)})
                    </div>
                    <p>${business.reviews.length} reviews</p>
                `;
                businessList.appendChild(card);
            });
        }

        // Form validation and submission
        document.getElementById('reviewForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('businessName').value;
            const rating = parseFloat(document.getElementById('rating').value);
            const comment = document.getElementById('comment').value;

            let valid = true;

            // Validation
            if (!name) {
                document.getElementById('nameError').classList.add('visible');
                valid = false;
            } else {
                document.getElementById('nameError').classList.remove('visible');
            }

            if (isNaN(rating) || rating < 1 || rating > 5) {
                document.getElementById('ratingError').classList.add('visible');
                valid = false;
            } else {
                document.getElementById('ratingError').classList.remove('visible');
            }

            if (!comment) {
                document.getElementById('commentError').classList.add('visible');
                valid = false;
            } else {
                document.getElementById('commentError').classList.remove('visible');
            }

            if (valid) {
                // Add to businesses array
                const existingBusiness = businesses.find(b => b.name === name);
                if (existingBusiness) {
                    existingBusiness.reviews.push({
                        user: 'Anonymous',
                        rating,
                        comment
                    });
                    // Update average rating
                    const total = existingBusiness.reviews.reduce((sum, review) => sum + review.rating, 0);
                    existingBusiness.rating = total / existingBusiness.reviews.length;
                } else {
                    businesses.push({
                        id: businesses.length + 1,
                        name,
                        rating,
                        reviews: [{
                            user: 'Anonymous',
                            rating,
                            comment
                        }]
                    });
                }

                renderBusinesses();
                e.target.reset();
            }
        });

        // Initial render
        renderBusinesses();
