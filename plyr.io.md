https://www.npmjs.com/package/plyr-react


To use **Plyr.io**, a modern media player, in a **Next.js** app, follow these steps:

---

### 1. **Install Plyr**
Install the Plyr library and its corresponding styles:

```bash
npm install plyr react-plyr
```

---

### 2. **Include Plyr CSS**
Since Plyr requires its CSS, import the styles in your app. In Next.js, you can include the CSS in your `_app.js` or `_app.tsx` file:

```javascript
// _app.js
import "plyr/dist/plyr.css";
import "@/styles/globals.css"; // Your custom styles
```

---

### 3. **Set Up Plyr in a Component**
Use the `react-plyr` library to integrate Plyr into your React components.

Here's an example:

```javascript
import React from "react";
import Plyr from "react-plyr";

const VideoPlayer = () => {
  return (
    <div>
      <Plyr
        type="youtube" // or "vimeo", "video", etc.
        url="https://www.youtube.com/watch?v=bTqVqk7FSmY" // Replace with your media URL
        options={{
          controls: [
            "play-large", // Play button in the center
            "play", // Play/pause button
            "progress", // Progress bar
            "current-time", // Current time of playback
            "mute", // Mute button
            "volume", // Volume control
            "settings", // Settings menu
            "fullscreen", // Fullscreen toggle
          ],
        }}
      />
    </div>
  );
};

export default VideoPlayer;
```

---

### 4. **Dynamic Loading (for Client-Side Rendering Only)**
Next.js uses **SSR (Server-Side Rendering)** by default. Plyr, being a browser-specific library, can cause issues during SSR. To handle this, dynamically load the Plyr component only on the client-side.

Use Next.js’s `dynamic` import feature:

```javascript
import dynamic from "next/dynamic";

const DynamicPlyr = dynamic(() => import("react-plyr"), { ssr: false });

const VideoPlayer = () => {
  return (
    <div>
      <DynamicPlyr
        type="youtube"
        url="https://www.youtube.com/watch?v=bTqVqk7FSmY"
      />
    </div>
  );
};

export default VideoPlayer;
```

---

### 5. **Customizing Styles**
If you want to customize the player’s appearance, you can either:
1. Modify Plyr's default CSS using overrides in your custom stylesheet.
2. Pass additional CSS classes through the `className` prop in the `Plyr` component.

---

### 6. **Use Advanced Options**
For advanced customization, you can refer to the [Plyr API documentation](https://github.com/sampotts/plyr#api). For example, you can add event listeners or handle custom behavior by using the `on` prop.

Example:

```javascript
const options = {
  autoplay: true,
  muted: true,
};

const VideoPlayer = () => {
  return (
    <DynamicPlyr
      type="youtube"
      url="https://www.youtube.com/watch?v=bTqVqk7FSmY"
      options={options}
    />
  );
};
```

---

### 7. **Optional: Custom Plyr Wrapper**
If `react-plyr` does not meet your requirements, you can directly use Plyr by importing it and managing the player manually:

```javascript
import React, { useEffect, useRef } from "react";
import Plyr from "plyr";

const CustomPlyrPlayer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const player = new Plyr(videoRef.current);
    return () => {
      player.destroy();
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        className="plyr"
        playsInline
        controls
        data-poster="/path/to/poster.jpg"
      >
        <source src="/path/to/video.mp4" type="video/mp4" />
        <source src="/path/to/video.webm" type="video/webm" />
      </video>
    </div>
  );
};

export default CustomPlyrPlayer;
```

---

### Summary
- Install Plyr and include its styles.
- Use `react-plyr` for simplicity, or Plyr directly for full control.
- Handle SSR issues with dynamic imports in Next.js.
- Customize styles and options for a tailored experience.

Let me know if you'd like a more detailed implementation! 😊