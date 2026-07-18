"use client";

import { useEffect, useRef, useState } from "react";
import type { ImageType } from "./editor-preview-image";
import { cn } from "@/shared/lib/utils";
import { Row } from "@/shared/ui/layout";
import { Button } from "@/shared/ui/button";
import Image from "next/image";

type ImageChangePositionProps = {
  value: ImageType;
  onChange: (image: ImageType | null) => void;
};

export const ImageEditor = ({ value, onChange }: ImageChangePositionProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  // pointer
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const isHoldRef = useRef(false);

  // position
  const target = useRef({ ...value.position });
  const current = useRef({ ...value.position });

  const [isDragging, setIsDragging] = useState(false);

  const handleSavePosition = () => {
    setIsDragging(false);
    onChange?.({
      url: value.url,
      position: {
        x: +target.current.x.toFixed(3),
        y: +target.current.y.toFixed(3),
      },
    });
    isDraggingRef.current = false;
  };
  const handleStartDrag = () => {
    setIsDragging(true);
    isDraggingRef.current = true;
  };

  const handleDeleteImage = () => {
    onChange?.(null);
    target.current = { x: 0, y: 0 };
    current.current = { x: 0, y: 0 };
  };

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    // POINTER

    const onPointerDown = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      el.setPointerCapture(e.pointerId);
      isHoldRef.current = true;

      prevPointerRef.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = (_e: PointerEvent) => {
      isHoldRef.current = false;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || !isHoldRef.current) return;

      const dx = e.clientX - prevPointerRef.current.x;
      const dy = e.clientY - prevPointerRef.current.y;

      const factor = 0.9;

      target.current.x = clamp(target.current.x + dx * factor, 0, 100);
      target.current.y = clamp(target.current.y + dy * factor, 0, 100);

      prevPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointermove", onPointerMove);

    // RAF LOOP

    let rafId: number;
    const speed = 0.15; // плавность
    const epsilon = 0.01; // порог остановки

    const animate = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;

      // 👉 SNAP (остановка)
      if (Math.abs(dx) < epsilon) {
        current.current.x = target.current.x;
      } else {
        current.current.x += dx * speed;
      }

      if (Math.abs(dy) < epsilon) {
        current.current.y = target.current.y;
      } else {
        current.current.y += dy * speed;
      }

      // 👉 ОКРУГЛЕНИЕ ТОЛЬКО ДЛЯ DOM
      const x = current.current.x;
      const y = current.current.y;

      el.style.objectPosition = `${x}% ${y}%`;

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className={cn("w-full h-[400px] relative  overflow-hidden")}>
      <Row className="absolute right-[5px] bottom-[5px] z-10">
        {isDragging ? (
          <Button variant={"secondary"} size={"sm"} onClick={handleSavePosition}>
            Сохранить положение
          </Button>
        ) : (
          <>
            <Button size={"sm"} onClick={handleStartDrag}>
              Изменить положение
            </Button>
            <Button size={"sm"} onClick={handleDeleteImage}>
              Удалить
            </Button>
          </>
        )}
      </Row>

      <Image
        ref={imageRef}
        src={value.url}
        draggable={false}
        alt="image"
        unoptimized
        fill
        style={{
          willChange: "object-position",
          objectFit: "cover",
          cursor: isDragging ? "move" : "default",
        }}
      />
    </div>
  );
};
