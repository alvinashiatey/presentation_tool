const text = [
  "everything was an European background, your",
  "upbringing your teaching school in school",
  "My father was a pastor you know missionary a pastor",
  "and everything had to be English we're",
  "not even allowed to speak our country's",
  "language in schools and they called our own",
  "languages vernacular",
  "so English was",
  "the real language you had to speak in",
  "school so everything was in English with",
  "what were taught in schools nobody was",
  "thinking of whether to be African or",
  "not we just accepted that we were English",
  "and everybody that went to England for",
  "studies was a master you know everybody",
  "Wants to go to England to come",
  "back home to be master you know so I",
  "never thought about it African as such",
  "so it didn't mean anything to",
  "me until much later in my life it was in",
  "England I started to feel the awareness of",
  "How to be an African because for the",
  "first time I came to England I started to",
  "feel oh wow",
  "so this white people don't like us",
  "Too much you know this is my experience",
  "from having to rent rooms you know I had",
  "so much at that time you read the newspapers in",
  "England house for rent",
  "no coloreds no dogs and I'll see that",
  "annoyed me a lot and then many students",
  "So in my student days in",
  "England I said to be aware of having to",
  "be an African but we had nothing to",
  "offer as Africans because we all just",
  "taught English",
  "like one of the latest songs I'm",
  "singing now I said teacher don't teach",
  "me nonsense right now I was trying to",
  "make this my people see because in",
  "Africa people respect teachers you know",
  "teachers because they teach English and",
  "they teach their pupils you know respect",
  "teachers and Revd",
  "pastors you know in Africa so okay now I",
  "saw that I should not use teacher as my",
  "focus so I said I title the song teacher",
  "Dont teach me nonsense now I now move this",
  "song to let the people see that white",
  "men have taught us everything we know",
  "but I make people see also that one",
  "importantly thing they taught us was politics",
  "because I wove into the song to the",
  "elections in Nigeria the because it was",
  "a farce",
  "now I mentioned democracy now in English",
  "in English man will say Demo",
  "democracy but if the Africa man wants to say it in",
  "broken we will say demo-cera-sy you see now",
  "and I'm thought of the word I said",
  "Demo-cera-zy now I",
  "saw craziness I said I could now see my",
  "people let my people see a democracy",
  "really is not that war that is really",
  "madness you know so I said now now as I",
  "Started to sing I said I start to think of",
  "this word democracy democracy",
  "Crazy demo demonstration of craze",
  "Crazy demonstration then I went a",
  "little bit serious because I know that",
  "people will laugh at that when they hear",
  "that now i went a little bit serious i said now if",
  "it's not crazy",
  "why that in Africa as time goes forward",
  "things getting worse poor man dey cry rich",
  "Man dey mess democracy crazy demo",
  "demonstration of craze then I ended up",
  "not to fuck the minds of the",
  "colonialists up I said if good teacher",
  "teach something",
  "if a good teacher teaches something and",
  "student make mistake teacher must tell",
  "him that he is making mistake",
];

class TextDisplayer {
  private text: string[];
  private container: HTMLDivElement;
  private counter: number = 0;
  private intervalId: number | null = null;
  private toggleIntervalId: number | null = null;
  private toggleIntervalTime: number = 5000; // 5 seconds
  private intervalTime: number = 10000; // 10 seconds
  private initialFontSize: number = 10; // in rem
  private currentFontSize: number = 10; // in rem
  private minFontSize: number = 2; // in rem
  private fontSizeStep: number = 0.5; // in rem

  constructor(text: string[], containerId: string) {
    this.text = text;
    const element = document.getElementById(containerId) as HTMLDivElement;
    if (!element) {
      throw new Error(`Element with ID '${containerId}' not found.`);
    }
    this.container = element;
    this.container.style.fontSize = `${this.initialFontSize}rem`;
    this.container.style.overflowY = 'auto';
  }

  public start(): void {
    this.appendText();
    this.intervalId = window.setInterval(() => {
      this.appendText();
    }, this.intervalTime);

    this.toggleIntervalId = window.setInterval(() => {
      this.toggleRandomSpans();
    }, this.toggleIntervalTime);
  }

  private appendText(): void {
    if (this.counter >= this.text.length) {
      this.stop();
      return;
    }
    const selectedText = this.text[this.counter];
    const words = selectedText.split(' ');
    words.forEach(word => {
      const span = document.createElement('span');
      span.textContent = word;
      this.container.appendChild(span);
      this.container.appendChild(document.createTextNode(' '));
    });
    this.counter++;
    this.adjustFontSize();
  }

  private toggleRandomSpans(): void {
    const spans = this.container.querySelectorAll('span');
    if (spans.length === 0) return;

    const numberOfSpansToToggle = Math.floor(Math.random() * spans.length) + 1;
    for (let i = 0; i < numberOfSpansToToggle; i++) {
      const randomIndex = Math.floor(Math.random() * spans.length);
      const span = spans[randomIndex] as HTMLSpanElement;
      span.toggleAttribute('hidden');
    }
  }

  private adjustFontSize(): void {
    while (this.container.scrollHeight > this.container.clientHeight && this.currentFontSize > this.minFontSize) {
      this.currentFontSize -= this.fontSizeStep;
      console.log(this.currentFontSize);
      this.container.style.fontSize = `${this.currentFontSize}rem`;
    }
  }

  private stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.toggleIntervalId !== null) {
      clearInterval(this.toggleIntervalId);
      this.toggleIntervalId = null;
    }
  }
}
class Slider {
  private images: string[];
  private container: HTMLDivElement;
  private imgElement: HTMLImageElement;
  private currentIndex: number = 0;

  constructor(images: string[], containerId: string) {
    this.images = images;
    const element = document.getElementById(containerId) as HTMLDivElement;
    if (!element) {
      throw new Error(`Element with ID '${containerId}' not found.`);
    }
    this.container = element;
    this.imgElement = this.container.querySelector('img') as HTMLImageElement;
    if (!this.imgElement) {
      throw new Error(`No <img> element found inside '${containerId}'.`);
    }
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    window.addEventListener('keydown', (event) => this.handleKeyDown(event));
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.nextImage();
    } else if (event.key === 'ArrowLeft') {
      this.previousImage();
    }
  }

  private nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
  }

  private previousImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImage();
  }

  private updateImage(): void {
    this.imgElement.src = this.images[this.currentIndex];
  }

  public start(): void {
    this.updateImage();
  }
}

// Usage Example
const imagePaths = [
  "/works/01.png",
  "/works/02.png",
    "/works/03.jpg",
    "/works/04.png",
    "/works/05.jpg",
    "/works/06.jpg",
    "/works/07.png",
    "/works/08.png",
    "/works/09.png",
    "/works/10.png",
    "/works/11.png",
    "/works/break.gif",
];

const slider = new Slider(imagePaths, "slides");

const displayer = new TextDisplayer(text, "message");
export {
    displayer,
  slider
}
