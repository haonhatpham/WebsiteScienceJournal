
fetch("../JSON/all_journal.json")
  .then(response => response.json())
  .then(function(data) {
    for(var i=0; i < data.length;i++){
        if(i%3==0)
        {
            document.querySelector(".journals").innerHTML+=` 
            <div class="archive-year-divider"  id="${2023-(i/3)}">
                <span></span>
                <div class="issueYear">${2023-(i/3)}</div>
                <span></span>
            </div> `;
        }
      document.querySelector(".journals").innerHTML+=
      `
        <div class="journal  wow flipInX center">
          <div>
            <div class="post-image"><img class="imgonboard" src="${data[i].image}" alt=""></div>
            <div class="news-content">
              <span class="review">
                ${data[i].type}
              </span>
              <div class="post-meta">
                <small class="text-muted">
                  <i class="fas fa-calendar-alt"></i> ${data[i].time}    &nbsp;  &nbsp;
                  <i class="fas fa-file-alt"></i> ${data[i].quantity}
                </small>
              </div>
              <a href="../html/journal${i+1}.html" class="titlelink">
                <h3 class="post-header">${data[i].title}</h3>
              </a>
              <div class="author">
                <i>
                  <p>
                    by
                    <b>
                      <span>${data[i].author}</span>
                    </b>
                  </p>
                </i>
              </div>
              <div class="summary">
                <div class="summary-wrapper">
                  <p class="for-summary">${data[i].describle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    }
  }
)


