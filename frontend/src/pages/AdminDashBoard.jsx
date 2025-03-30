import React, { useCallback, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { FaStar, FaEdit, FaYoutube, FaRegStar } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from "react-hot-toast";

// ... other imports remain the same ...

const UserLikedQuestion = () => {
    // ... existing state and logic ...

    const tableVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    return (
        <>
            {/* Enhanced Header */}
            <header className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#1a1f2d] to-[#232837] shadow-2xl backdrop-blur-xl fixed top-0 left-0 right-0 z-50 border-b border-[#00C1B3]/30">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-tr from-[#00C1B3] to-[#00E3CC] rounded-full animate-pulse" />
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00C1B3] to-[#00E3CC]">
                        VitpPrep
                    </h3>
                </div>

                {/* ... profile dropdown remains the same ... */}
            </header>

            <div className="w-full min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white px-4 py-6 pt-[90px]">
                <div className="max-w-7xl mx-auto">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#00C1B3] to-[#00E3CC] bg-clip-text text-transparent"
                    >
                        Your Favorite Questions
                    </motion.h2>

                    {questions.length > 0 ? (
                        <motion.div 
                            variants={tableVariants}
                            initial="hidden"
                            animate="visible"
                            className="bg-[#1E293B]/50 backdrop-blur-lg rounded-xl shadow-2xl border border-[#334155] overflow-hidden"
                        >
                            <Table className="w-full">
                                <TableHeader className="bg-[#1E293B]">
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="text-center w-20">Status</TableHead>
                                        <TableHead className="text-left">Question</TableHead>
                                        <TableHead className="text-center">Difficulty</TableHead>
                                        <TableHead className="text-center">Favorite</TableHead>
                                        <TableHead className="text-center">Links</TableHead>
                                        {!isUser && <TableHead className="text-center">Actions</TableHead>}
                                    </TableRow>
                                </TableHeader>
                                
                                <TableBody>
                                    <AnimatePresence>
                                        {questions.map((question) => (
                                            <motion.tr
                                                key={question._id}
                                                variants={rowVariants}
                                                className="hover:bg-[#2d374850] border-t border-[#334155]/50 group"
                                            >
                                                <TableCell className="text-center">
                                                    <motion.div 
                                                        whileHover={{ scale: 1.05 }}
                                                        className="flex justify-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="h-6 w-6 accent-[#00C1B3] cursor-pointer rounded-md checked:bg-[#00C1B3] border-[#334155]"
                                                            checked={question.completed}
                                                            onChange={() => handleProgressToggle(question._id)}
                                                        />
                                                    </motion.div>
                                                </TableCell>

                                                <TableCell className="font-medium text-[#E2E8F0] group-hover:text-[#00C1B3] transition-colors">
                                                    {question.title}
                                                </TableCell>

                                                <TableCell className="text-center">
                                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                                        question.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                                                        question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                        'bg-red-500/20 text-red-400'
                                                    }`}>
                                                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                                                    </span>
                                                </TableCell>

                                                <TableCell className="text-center">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="p-2 rounded-full"
                                                        onClick={() => handleFavoriteToggle(question._id)}
                                                    >
                                                        {question.likedBy.includes(user?._id) ? (
                                                            <FaStar className="text-2xl text-[#FFD700] animate-pulse" />
                                                        ) : (
                                                            <FaRegStar className="text-2xl text-[#64748B] hover:text-[#00C1B3]" />
                                                        )}
                                                    </motion.button>
                                                </TableCell>

                                                <TableCell className="text-center space-x-3">
                                                    {question.url && (
                                                        <motion.a
                                                            href={question.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            whileHover={{ y: -2 }}
                                                            className="inline-block p-2 bg-[#1E293B] rounded-lg hover:bg-[#00C1B3] transition-colors"
                                                        >
                                                            <SiLeetcode className="text-xl text-orange-500" />
                                                        </motion.a>
                                                    )}
                                                    {question.videoLink && (
                                                        <motion.a
                                                            href={question.videoLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            whileHover={{ y: -2 }}
                                                            className="inline-block p-2 bg-[#1E293B] rounded-lg hover:bg-[#00C1B3] transition-colors"
                                                        >
                                                            <FaYoutube className="text-xl text-red-500" />
                                                        </motion.a>
                                                    )}
                                                </TableCell>

                                                {!isUser && (
                                                    <TableCell className="text-center">
                                                        <motion.div whileHover={{ scale: 1.05 }}>
                                                            <Drawer>
                                                                <DrawerTrigger>
                                                                    <button className="p-2 hover:bg-[#1E293B] rounded-lg transition-colors">
                                                                        <FaEdit className="text-[#00C1B3]" size={18} />
                                                                    </button>
                                                                </DrawerTrigger>
                                                                {/* Drawer content remains the same */}
                                                            </Drawer>
                                                        </motion.div>
                                                    </TableCell>
                                                )}
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </TableBody>
                            </Table>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20"
                        >
                            <div className="w-32 h-32 mb-6 bg-gradient-to-r from-[#00C1B3] to-[#00E3CC] rounded-full flex items-center justify-center">
                                <FaRegStar className="text-4xl text-white animate-pulse" />
                            </div>
                            <h3 className="text-2xl font-semibold text-[#94A3B8] mb-2">
                                No Favorites Yet
                            </h3>
                            <p className="text-[#64748B] text-center">
                                Start adding questions to your favorites to see them here!
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserLikedQuestion;