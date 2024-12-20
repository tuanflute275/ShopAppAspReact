import React from "react";
import "./faq.css";

const Faq = () => {
  return (
    <main>
      <div class="text-center box-title">
        <nav class="breadcrumb text-center d-flex justify-content-center">
          <a class="breadcrumb-item default" routerLink="/">
            Home
          </a>
          <span class="breadcrumb-item active">FAQ</span>
        </nav>
        <h3 class="title">Frequently asked questions</h3>
        <div class="container"></div>
      </div>
      {/* <!-- container 1 --> */}
      <div class="container">
        <h4 class="heading">General Question</h4>
        <div class="row">
          <div class="col-md-6">
            <div
              class="panel-group"
              id="accordion"
              role="tablist"
              aria-multiselectable="true"
            >
              {/* <!-- 1 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingOne">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Before you get started
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseOne"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingOne"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- 2 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingTwo">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Compatibility with premium plugins
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseTwo"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingTwo"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- 3 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingThree">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Install theme demo contents
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseThree"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingThree"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- 4 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingFour">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Translation and localization services
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseFour"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingFour"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- 5 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingFive">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Live chat support
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseFive"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingFive"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div
              class="panel-group"
              id="accordion"
              role="tablist"
              aria-multiselectable="true"
            >
              {/* <!-- 6 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingSix">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseSix"
                      aria-expanded="false"
                      aria-controls="collapseSix"
                    >
                      Before you get started
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseSix"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingSix"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- 7 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingSeven">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseSeven"
                      aria-expanded="false"
                      aria-controls="collapseSeven"
                    >
                      Compatibility with premium plugins
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseSeven"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingSeven"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- 8 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingEight">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseEight"
                      aria-expanded="false"
                      aria-controls="collapseEight"
                    >
                      Install theme demo contents
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseEight"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingEight"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- 9 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingNine">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseNine"
                      aria-expanded="false"
                      aria-controls="collapseNine"
                    >
                      Translation and localization services
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseNine"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingNine"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- 10 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingTen">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseTen"
                      aria-expanded="false"
                      aria-controls="collapseTen"
                    >
                      Live chat support
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseTen"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingTen"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- container 2 --> */}
      <div class="container">
        <h4 class="heading-2">Payment & Gift card</h4>
        <div class="row">
          <div class="col-md-6">
            <div
              class="panel-group"
              id="accordion"
              role="tablist"
              aria-multiselectable="true"
            >
              {/* <!-- 1 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingOnee">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseOnee"
                      aria-expanded="false"
                      aria-controls="collapseOnee"
                    >
                      Changing the timezone
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseOnee"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingOnee"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- 2 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingTwoo">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseTwoo"
                      aria-expanded="false"
                      aria-controls="collapseTwoo"
                    >
                      Developer documentation
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseTwoo"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingTwoo"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- 3 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingThreee">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseThreee"
                      aria-expanded="false"
                      aria-controls="collapseThreee"
                    >
                      Connnection social media channels
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseThreee"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingThreee"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- 4 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingFourr">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseFourr"
                      aria-expanded="false"
                      aria-controls="collapseFourr"
                    >
                      Optimize theme speed & perfomance
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseFourr"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingFourr"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div
              class="panel-group"
              id="accordion"
              role="tablist"
              aria-multiselectable="true"
            >
              {/* <!-- 5 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingFivee">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseFivee"
                      aria-expanded="false"
                      aria-controls="collapseFivee"
                    >
                      Fully responsive
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseFivee"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingFivee"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- 6 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingSixx">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseSixx"
                      aria-expanded="false"
                      aria-controls="collapseSixx"
                    >
                      Translation and localization services
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseSixx"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingSixx"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- 7 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingSevenn">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseSevenn"
                      aria-expanded="false"
                      aria-controls="collapseSevenn"
                    >
                      Live chat support
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseSevenn"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingSevenn"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- 8 --> */}
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingEightt">
                  <h4 class="panel-title">
                    <a
                      class="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseEightt"
                      aria-expanded="false"
                      aria-controls="collapseEightt"
                    >
                      RTL Support now
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseEightt"
                  class="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingEightt"
                >
                  <div class="panel-body">
                    <p>
                      Nulla imperdiet odio tempor nisl vulputate scelerisque.
                      Fusce interdum ultricies convallis. Vivamus efficitur
                      purus eu elit scelerisque blandit. Nullam viverra est quis
                      erat fringilla, at rutrum sem lacinia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Faq;
